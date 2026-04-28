import React, { useState } from 'react';
import CreateVoucherModal from '../../../../../components/modal/CreateVoucherModal';
import VaucherTable from './VaucherTable';
import { Plus } from 'lucide-react';

const CreateVoucher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);
   
    const handleAddVoucher = () => {
        toggleModal();
    }

    return (
        <div className=" bg-white rounded-lg mt-5">
            <div className="p-7 flex items-center gap-2 justify-between cursor-pointer">
                <div>
                    <h1 className="text-lg font-bold text-[#262626]">Voucher Management</h1>
                    <p className="text-sm text-[#737373] font-medium">Manage information pages on your platform</p>
                </div>
                <div onClick={handleAddVoucher} className="bg-primary flex items-center p-2 rounded-sm cursor-pointer">
                    <Plus className='text-[#FFFFFF]' size={26} />
                    <button className='text-[#FFFFFF] font-semibold cursor-pointer'>Add Voucher</button>
                </div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
                <CreateVoucherModal
                    isOpen={isOpen}
                    toggleModal={toggleModal} />
            </div>
            <div className='px-5 pb-10'>
                <VaucherTable/>
            </div>
        </div>
    );
};

export default CreateVoucher;