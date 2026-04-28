import { Plus } from 'lucide-react';
import { NavLink, } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Stats from './components/Stats';
import TopviewShop from './components/TopviewShop';
import Charts from './chart/Charts';
import { useGetVendorDetailsQuery } from '../../../features/shop/shopApi';
import { DealCardSkeleton } from '../../../components/skeleton/DealCardSkeleton';
import { useGsapAnimations } from '../../../hooks/useGsapAnimations';

const CreatedShop = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: shopDetails, isLoading } = useGetVendorDetailsQuery(user?._id, {
    skip: !user?._id,
    refetchOnMountOrArgChange: true,
  });
  const animationScopeRef = useGsapAnimations(`created-shop-${shopDetails?.data?._id ?? user?._id ?? ""}`);

  if (!user?._id || isLoading) {
    return <DealCardSkeleton />;
  }

  return (
    <div ref={animationScopeRef} className="bg-white min-h-screen px-4 pt-32 pb-12" data-animate="dashboard">
      <div className='max-w-305 mx-auto'>
        <div className="flex items-center justify-between mb-8" data-animate="fade-up">
          <div className="flex gap-4">
            <div className="w-25 sm:w-32.5 h-25 sm:h-32.5 rounded-full border-2 border-[#4CAF50] overflow-hidden bg-white">
              <img src={shopDetails?.data?.business_logo} alt="Salon" className="object-fill p-1.5 w-25 sm:w-32 h-25 sm:h-32 rounded-full aspect-auto" />
            </div>
            <div className='space-y-3 mt-3'>
              <h1 className="text-xl sm:text-2xl font-bold text-[#262626]">{shopDetails?.data?.business_name}</h1>
              <NavLink to='/create-deal' className=''>
                <button className="mt-1 flex items-center gap-1 bg-primary text-white w-fit px-6 sm:px-12 py-2.5 rounded-full text-base font-medium
              hover:bg-secondary transition cursor-pointer">
                  <Plus size={18} /> Add New Deal
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <div data-animate="stagger">
          <Stats />
        </div>
        {/* Chart Section */}
        <div data-animate="fade-up">
          <Charts />
        </div>
        {/* Deals Section */}
        <div data-animate="fade-up">
          <TopviewShop />
        </div>
      </div>
    </div>
  );
};

export default CreatedShop;
