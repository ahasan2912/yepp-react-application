import { useGetAllCategoriesQuery } from '../../features/categories/CategoriesApi';
import SearchBox from './SearchBox';

const Banner = ({ handleSearch }) => {
    const { data: categories, isLoading } = useGetAllCategoriesQuery();

    if (isLoading) {
        return (
            <div className='bg-image px-4 bg-no-repeat bg-cover min-h-[52vh] sm:min-h-[56vh] md:min-h-[70vh]'>
                <div className='max-w-305 mx-auto flex min-h-[52vh] flex-col justify-center pt-62 pb-12 sm:min-h-[56vh] sm:pt-66 sm:pb-16 md:min-h-[60vh] md:pt-72 md:pb-10' data-animate="hero">
                    <h1 className='text-[#FFFFFF] text-[28px] sm:text-[45px] md:text-[56px] font-bold max-w-115.25 poppins leading-9 sm:leading-12 md:leading-17' data-animate-item>Find Local Deals & Save Big!</h1>
                    <p className='text-[#FFFFFF] text-sm sm:text-base font-medium mt-1' data-animate-item>Discover the best discounts from your favorite local businesses and start saving today.  </p>
                    <div data-animate-item>
                        <SearchBox handleSearch={handleSearch} />
                    </div>
                </div>
            </div>
        );
    }

    const categoryLength = categories?.data?.length;

    return (
        <div className='bg-image px-4 bg-no-repeat bg-cover min-h-[52vh] sm:min-h-[56vh] md:min-h-[70vh]'>
            <div className={`max-w-305 mx-auto flex min-h-[52vh] flex-col justify-center sm:min-h-[56vh] md:min-h-[60vh]   md:pb-10 ${categoryLength > 10 ? 'pt-62 pb-12 sm:pt-66 sm:pb-16 md:pt-72' : 'pt-52 pb-12 sm:pt-46 sm:pb-10 md:pt-66 md:pb-10'}`} data-animate="hero">
                <h1 className='text-[#FFFFFF] text-[32px] sm:text-[45px] md:text-[56px] font-bold max-w-115.25 poppins leading-9 sm:leading-12 md:leading-17' data-animate-item>Find Local Deals & Save Big!</h1>
                <p className='text-[#FFFFFF] text-sm sm:text-base font-medium mt-1' data-animate-item>Discover the best discounts from your favorite local businesses and start saving today.  </p>
                <div data-animate-item>
                    <SearchBox handleSearch={handleSearch} />
                </div>
            </div>
        </div>
    );
};

export default Banner;
