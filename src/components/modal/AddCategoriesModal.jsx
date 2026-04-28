import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateNewCategoryMutation } from "../../features/categories/CategoriesApi";

const AddCategoriesModal = ({ isOpen, toggleModal }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [createNewCategory, { isLoading, error, isSuccess }] = useCreateNewCategoryMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Category created successfully!");
        }
        if (error) {
            const message = error?.data?.message || "Category created failed!";
            toast.error(message);
        }

    }, [isSuccess, error]);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        const categoriesData = {
            category_name: data?.category_name,
        };
        const formData = new FormData();
        formData.append("data", JSON.stringify(categoriesData));
        formData.append("file", data?.photo?.[0]);
        const res = await createNewCategory(formData);
        if (res?.data?.success) {
            toggleModal();
            reset();
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-xs overflow-y-auto pt-36"
            onClick={toggleModal}>
            <div
                className="relative w-full max-w-125 p-6 bg-white rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200 "
                onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={toggleModal}
                    className="absolute top-6 right-4 text-gray-400 hover:text-gray-600">
                    <X />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 pb-5">Add Categories</h2>
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="relative">
                            <label className="text-left text-gray-800">Category name</label>
                            <input
                                type="text"
                                placeholder="Categories Name"
                                className="mt-2 w-full px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('category_name', {
                                    required: 'Categories Name required',
                                })}
                            />
                        </div>
                        {errors.category_name && (
                            <p className="text-sm text-red-500 ml-4">
                                {errors.category_name.message}
                            </p>
                        )}
                        <div className="relative">
                            <label className="text-left text-gray-800">Category Image</label>
                            <input
                                type="file"
                                placeholder="Categories Image"
                                className="mt-2 w-full px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary "
                                {...register('photo', {
                                    required: 'Categories image required',
                                })}
                            />
                        </div>
                        {errors.category_name && (
                            <p className="text-sm text-red-500 ml-4">
                                {errors.photo.message}
                            </p>
                        )}
                        <div className="text-center pt-10">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-primary hover:bg-secondary text-white font-bold py-3 px-20 rounded-full shadow-xl shadow-[#4BBDCF]/20 transition-all transform active:scale-95 text-xl w-full flex items-center justify-center">
                                {isLoading ? (
                                    <div className="spinner-border animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                                ) : (
                                    <span className="font-medium text-lg text-[#FFFFFF]">Add Categories</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCategoriesModal;
