import { images } from '../../../assets/image';

const Redeem = () => {
    return (
        <div className="grid grid-cols-3 md:grid-cols-3 sm:mb-7 gap-5">
            <div className="max-w-28 sm:max-w-32 text-center space-y-2">
                <h1 className='text-sm font-bold text-[#0369A1] sm:text-base'>1. Redeem the Deal</h1>
                <div className="flex items-center justify-center">
                    <img className='w-24 object-cover sm:w-35' src={images.dealImage} alt="dealImage" />
                </div>
            </div>
            <div className="max-w-36 sm:max-w-50 text-center space-y-2">
                <h1 className='text-sm font-bold text-[#0369A1] sm:text-base'>2. Show Your Coupon</h1>
                <div className="flex items-center justify-center">
                    <img className='w-24 object-cover sm:w-35' src={images.cuponImage} alt="dealImage" />
                </div>
            </div>
            <div className="max-w-28 sm:max-w-32.5 text-center space-y-2">
                <h1 className='text-sm font-bold text-[#0369A1] sm:text-base'>3. Enjoy Your Treatment</h1>
                <div className="flex items-center justify-center">
                    <img className='w-24 object-cover sm:w-35' src={images.treatmentImage} alt="dealImage" />
                </div>
            </div>
        </div>
    );
};

export default Redeem;
