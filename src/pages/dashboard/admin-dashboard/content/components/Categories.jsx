import React, { useState } from 'react';
import AddCategoriesModal from '../../../../../components/modal/AddCategoriesModal';
import { Plus } from 'lucide-react';
import { useGetAllCategoriesQuery } from '../../../../../features/categories/CategoriesApi';
import CategorieTable from './CategorieCard';
import CategoriesSkeleton from '../../../../../components/skeleton/dashboard/CategoriesSkeleton';

const Categories = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);
    const { data: categoriess, isLoading: categoriesLoading } = useGetAllCategoriesQuery();

    if (categoriesLoading) {
        return <CategoriesSkeleton />
    }
    
    const handleAddCategories = () => {
        toggleModal();
    }

    return (
        <div className="bg-white rounded-lg mt-5">
            <div className="p-7 flex items-center gap-2 justify-between cursor-pointer">
                <div>
                    <h1 className="text-lg font-bold text-[#262626]">Categories Pages</h1>
                    <p className="text-sm text-[#737373] font-medium">Manage information pages on your platform</p>
                </div>
                <div onClick={handleAddCategories} className="bg-primary flex items-center p-2 rounded-sm cursor-pointer">
                    <Plus className='text-[#FFFFFF]' size={26} />
                    <button className='text-[#FFFFFF] font-semibold cursor-pointer'>Add Categories</button>
                </div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
                <AddCategoriesModal
                    isOpen={isOpen}
                    toggleModal={toggleModal} />
            </div>
            <div className='px-5 pb-10'>
                <CategorieTable categories={categoriess?.data} />
            </div>
        </div>
    );
};

export default Categories;