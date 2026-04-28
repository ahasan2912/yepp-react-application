import { useState } from 'react';
import toast from 'react-hot-toast';
import { images } from '../../../assets/image';
import { Share2 } from 'lucide-react';

const shareOptions = [
    { id: "whatsapp", label: "WhatsApp", icon: images.whatapp },
    { id: "messenger", label: "Messenger", icon: images.messanger },
    { id: "copy", label: "Copy link", icon: images.copy },
];

const CopiedLink = ({ _id }) => {
    const [open, setOpen] = useState(false);
    const link = `${window.location.origin}/deal-details/${_id}`;
    const handleShare = (platform) => {
        let url = "";
        if (platform === "whatsapp") {
            url = `https://wa.me/?text=${encodeURIComponent(link)}`;
        }
        if (platform === "messenger") {
            url = `https://m.me/?link=${encodeURIComponent(link)}`;
        }
        if (platform === "x") {
            url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`;
        }
        if (platform === "copy") {
            navigator.clipboard.writeText(link);
            toast.success("Link copied!");
            setOpen(false);
            return;
        }
        if (url) {
            window.open(url, "_blank");
            setOpen(false);
        }
    };
    return (
        <div className="relative flex gap-3">
            {/* Share Button */}
            <button
                type="button"
                aria-label="Share deal"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-[#525252] shadow-sm transition-colors hover:bg-gray-50 cursor-pointer"
            >
                <Share2 size={18} />
            </button>

            {open && (
                <div className="absolute right-0 top-11 z-30 w-44 rounded-lg border border-gray-100 bg-white p-2 shadow-lg">
                    <p className="px-2 pb-1 text-xs font-semibold text-[#737373]">Share deal</p>
                    <div className="space-y-1">
                        {shareOptions.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => handleShare(option.id)}
                                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-semibold text-[#262626] transition-colors hover:bg-[#F0F9FF] cursor-pointer"
                            >
                                <img
                                    className="h-5 w-5 object-contain"
                                    src={option.icon}
                                    alt=""
                                    aria-hidden="true"
                                />
                                <span>{option.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CopiedLink;
