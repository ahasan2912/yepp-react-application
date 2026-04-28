import React, { useState } from 'react';
import HeadingTitle from '../components/HeadingTitle';
import AddPlansModal from '../../../../components/modal/AddPlansModal';
import PlansTable from './PlansTable';
import { Plus } from 'lucide-react';

const Plans = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);

    const handleAddPlan = () => {
        toggleModal();
    }
    return (
        <div className="min-h-screen pt-3 pb-5">
            <HeadingTitle
                title='Plans'
                description='Create and manage subscription plans for vendors.'
            />
            <div className="bg-white rounded-lg mt-5">
                <div className="p-7 flex items-center gap-2 justify-between cursor-pointer">
                    <div>
                        <h1 className="text-lg font-bold text-[#262626]">Plan Pages</h1>
                        <p className="text-sm text-[#737373] font-medium">Create and manage subscription plans for vendors.</p>
                    </div>
                    <div onClick={handleAddPlan} className="bg-primary flex items-center p-2 rounded-sm cursor-pointer">
                        <Plus className='text-[#FFFFFF]' size={26} />
                        <button className='text-[#FFFFFF] font-semibold cursor-pointer'>Add Plan</button>
                    </div>
                </div>
                <div className="relative flex flex-col items-center justify-center">
                    <AddPlansModal
                        isOpen={isOpen}
                        toggleModal={toggleModal} />
                </div>
                <div className='px-5 pb-10'>
                    <PlansTable />
                </div>
            </div>
        </div>
    );
};

export default Plans;

