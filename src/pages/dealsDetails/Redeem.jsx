import { images } from '../../../assets/image';

const Redeem = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4 lg:ml-4">
            <div className="max-w-32 mx-auto text-center space-y-2">
                <h1 className='text-base font-bold text-[#0369A1]'>1. Redeem the Deal</h1>
                <div className="flex items-center justify-center">
                    <img className='w-35 object-cover' src={images.dealImage} alt="dealImage" />
                </div>
            </div>
            <div className="max-w-50 mx-auto text-center space-y-2">
                <h1 className='text-base font-bold text-[#0369A1]'>2. Show Your Coupon</h1>
                <div className="flex items-center justify-center">
                    <img className='w-35 object-cover' src={images.cuponImage} alt="dealImage" />
                </div>
            </div>
            <div className="max-w-32.5 mx-auto text-center space-y-2 mt-6">
                <h1 className='text-base font-bold text-[#0369A1]'>3. Enjoy Your Treatment</h1>
                <div className="flex items-center justify-center">
                    <img className='w-35 object-cover' src={images.treatmentImage} alt="dealImage" />
                </div>
            </div>
        </div>
    );
};

export default Redeem;