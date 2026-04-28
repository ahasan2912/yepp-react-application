import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEditCategoriesMutation, useGetAllCategoriesQuery } from "../../features/categories/CategoriesApi";
import CategoriesSkeleton from "../skeleton/dashboard/CategoriesSkeleton";
import toast from "react-hot-toast";

const EditCategoriesModal = ({ isOpen, toggleModal, editId }) => {
    const { data: allCategories, isLoading } = useGetAllCategoriesQuery();
    const [image, setImage] = useState("");
    const [editCategories, { isLoading: editLoading, error, isSuccess }] = useEditCategoriesMutation();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues: {
            category_name: "",
            category_image: null
        }
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Category updated successfully!");
        }
        if (error) {
            const message = error?.data?.message || "Category upaded failed!";
            toast.error(message);
        }

    }, [isSuccess, error, reset]);

    useEffect(() => {
        if (allCategories?.data) {
            const category = allCategories?.data?.find(cat => cat?._id === editId);
            if (category) {
                const { category_image, category_name } = category;
                reset({
                    category_name: category_name || "",
                    category_image: null,
                });
                setImage(category_image || "");
            }
        }
    }, [allCategories?.data, editId, reset]);

    const imageCategoryFile = watch("category_image");
    useEffect(() => {
        if (imageCategoryFile && imageCategoryFile[0]) {
            setImage(URL.createObjectURL(imageCategoryFile[0]));
        }
    }, [imageCategoryFile]);

    if (!isOpen) return null;

    if (isLoading) {
        return <CategoriesSkeleton />;
    }

    const onSubmit = async (data) => {
        const category = allCategories?.data?.find(cat => cat?._id === editId);
        const finalName = data?.category_name || category?.category_name;
        const updateData = {
            category_name: finalName,
        };
        const formData = new FormData();
        formData.append("data", JSON.stringify(updateData));
        if (data?.category_image?.[0]) {
            formData.append("file", data.category_image[0]);
        } else {
            formData.append("file", category?.category_image);
        }
        const res = await editCategories({
            id: editId,
            data: formData
        });
        if (res?.data?.statusCode) {
            toggleModal();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-xs overflow-y-auto pt-36"
            onClick={toggleModal}>
            <div
                className="relative w-full max-w-125 p-6 bg-white rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={toggleModal}
                    className="absolute top-6 right-4 text-gray-400 hover:text-gray-600">
                    <X />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 pb-5">Update Categories</h2>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="relative">
                            <label className="text-left text-gray-800">Category name</label>
                            <input
                                type="text"
                                placeholder="Categories Name"
                                className="mt-2 w-full px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('category_name', {
                                    required: 'Category name required',
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
                                accept="image/*"
                                className="w-full px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('category_image')}
                            />
                        </div>
                        {/* Show image */}
                        <div className="flex gap-3 mt-5">
                            <div>
                                <label className="block text-sm text-[#6b6767] font-medium mb-2 text-left">
                                    Category Image
                                </label>
                                {image && (
                                    <img
                                        src={image}
                                        alt="Category Preview"
                                        className="mb-2 w-36 h-fit object-contain border border-gray-300 rounded-md"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="text-center pt-10">
                            <button
                                type="submit"
                                disabled={editLoading}
                                className="bg-primary hover:bg-secondary text-white font-bold py-3 px-20 rounded-full shadow-xl shadow-[#4BBDCF]/20 transition-all transform active:scale-95 text-xl w-full flex justify-center items-center">
                                {editLoading ? (
                                    <div className="spinner-border animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                                ) : (
                                    <span className="font-medium text-lg text-[#FFFFFF]">Update Categories</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCategoriesModal;


