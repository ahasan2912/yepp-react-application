import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Copy, X, Check } from 'lucide-react';
import { getDealPricing } from '../../utils/dealPricing';

const ShowCuponModal = ({ isOpen, setIsOpen, deal }) => {
  const [activeTab, setActiveTab] = useState('coupon');
  const [copied, setCopied] = useState(false);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { title, reguler_price, discount, coupon_option, coupon } = deal?.data || {};
  const { regularPrice, finalPrice, discount: dealDiscount, savedAmount, hasDiscount } = getDealPricing(reguler_price, discount);
  

  return createPortal(
    <div className="fixed inset-0 z-9999 flex min-h-dvh items-center justify-center overflow-y-auto p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative bg-white w-full max-w-2xl rounded-xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="flex justify-end items-center px-5 pt-6 pb-2">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-700 cursor-pointer">
            <X size={24} />
          </button>
        </div>
        <div className="mx-5 mb-5 px-6 sm:px-4 flex flex-col items-center">
          <h2 className="text-primary text-2xl font-bold mb-6 text-center">
            {title}
          </h2>
          <div className="w-full space-y-3 mb-4 px-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Price:</span>
              <span className="text-primary font-bold text-xl">${finalPrice.toFixed(2)}</span>
            </div>
            {hasDiscount && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Regular:</span>
                <span className="text-gray-400 font-medium line-through">${regularPrice.toFixed(2)}</span>
              </div>
            )}
            {hasDiscount && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Discount:</span>
                <span className="text-emerald-500 font-bold bg-emerald-50 px-3 py-1 rounded-full text-sm">
                  {dealDiscount}%
                </span>
              </div>
            )}
          </div>
          <div className="text-center mb-4">
            {hasDiscount ? (
              <p className="text-primary font-bold tracking-wide">
                You save ${savedAmount.toFixed(2)}
              </p>
            ) : (
              <p className="font-medium text-slate-500">
                This deal uses a final price only.
              </p>
            )}
          </div>
          <div className="flex bg-gray-100/80 p-1.5 rounded-full w-full mb-8 border border-gray-200">
            {['coupon', 'QR', 'barcode'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 cursor-pointer rounded-full text-sm font-extrabold uppercase tracking-wider transition-all duration-200 ${activeTab === tab
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="w-full min-h-30 flex flex-col items-center justify-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 p-4">
            {activeTab === 'coupon' && (
              <div className="w-full animate-in fade-in slide-in-from-bottom-2">
                <div className="bg-[#e6f7f8] border-2 border-[#4dbbc4]/30 rounded-2xl p-6 text-center">
                  <span className="block text-xs text-primary font-bold mb-2 uppercase tracking-widest">Promo Code</span>
                  <h3 className="text-4xl font-black text-gray-800 mb-5 tracking-tighter">
                    {coupon}
                  </h3>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 mx-auto px-8 py-3 rounded-xl font-bold transition-all cursor-pointer ${copied ? 'bg-emerald-500 text-white' : 'bg-primary text-white hover:bg-secondary hover:shadow-md'
                      }`}
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'QR' && (
              <div className="p-4 bg-white rounded-2xl shadow-sm border animate-in zoom-in-95 duration-200">
                <img
                  src={`${coupon_option?.qr}`}
                  alt="Redemption QR"
                  className="w-full max-h-32 object-contain"
                />
              </div>
            )}

            {activeTab === 'barcode' && (
              <div className="p-4 bg-white rounded-2xl shadow-sm border animate-in zoom-in-95 duration-200">
                <img
                  src={`${coupon_option?.upc}`}
                  alt="Redemption QR"
                  className="w-full max-h-32  object-contain"
                />
              </div>
            )}
          </div>

          {activeTab === 'coupon' && (
            <p className="text-gray-400 text-xs mt-6 font-medium">
              Present this code at the checkout counter.
            </p>
          )}

          {/* Final Action */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-primary text-white cursor-pointer py-3 rounded-full font-black text-lg mt-8 mb-3 shadow-[0_10px_20px_-5px_rgba(77,187,196,0.4)] hover:shadow-[0_15px_25px_-5px_rgba(77,187,196,0.5)] active:scale-[0.98] transition-all">
            Close Deal
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ShowCuponModal;
