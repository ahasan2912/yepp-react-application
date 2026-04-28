import sevenDaysImage from '../assets/images/sevenDays.png';
import twelveDaysImage from '../assets/images/twelveDys.png';
import thirdtyDays from '../assets/images/thirtyDays.png';


export const FALLBACK_COLORS = [ "#8b5cf6", "#f87171", "#22d3ee", "#fbbf24", "#3b82f6", "#10b981", "#a78bfa", "#0ea5e9", "#38bdf8", "#facc15", "#4ade80", "#6366f1", "#fb7185", "#34d399", "#60a5fa", "#f97316", "#c084fc", "#2dd4bf", "#f43f5e", "#84cc16", "#e879f9", "#06b6d4", "#f59e0b", "#ec4899", "#14b8a6", "#a3e635", "#9333ea", "#0284c7", "#dc2626", "#16a34a", "#7c3aed", "#ef4444", "#06b6d4", "#eab308", "#2563eb", "#059669", "#7e22ce", "#0284c7", "#0ea5e9", "#ca8a04", "#15803d", "#4338ca", "#be185d", "#047857", "#1d4ed8", "#c2410c", "#6d28d9", "#0f766e", "#9d174d", "#65a30d", "#ff6b6b", "#4ecdc4", "#ffe66d", "#1a535c", "#ff9f1c", "#2ec4b6", "#e71d36", "#011627", "#ffbf69", "#cbf3f0", "#8338ec", "#3a86ff", "#ff006e", "#fb5607", "#ffbe0b", "#06d6a0", "#118ab2", "#073b4c", "#ffd166", "#ef476f", "#00b4d8", "#90dbf4", "#caf0f8", "#ffafcc", "#bde0fe", "#ffc8dd", "#cdb4db", "#a2d2ff", "#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#bdb2ff", "#ffc6ff", "#fffffc", "#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557", "#ffb703", "#fb8500", "#219ebc", "#8ecae6", "#023047", "#ffddd2", "#e29578", "#83c5be", "#006d77" ];

export const imagesList = [
    "https://kleosafrica.com/blog/wp-content/uploads/2019/10/Product-Review-Writing-Services.jpg",
    "https://www.youngurbanproject.com/wp-content/uploads/2025/03/Product-Marketing.jpg",
    "https://media.licdn.com/dms/image/v2/C5612AQFTMZcZXHgz3g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1589305696904?e=2147483647&v=beta&t=QRegbXwfkgNENfhIr-vKK5y2CUOWiVA1Pl4BYsg3-H0",
    "https://thumbs.dreamstime.com/b/product-concept-business-elements-white-background-58776145.jpg",
];


export const dealPlan = [
    { id: 'quick-start', title: 'Quick Start Plan', desc: 'Ideal for short-term promotion.', price: '$10', color: 'border-[#F6741C]', iconBg: 'bg-[#F6741C]', days: 7, image: sevenDaysImage, text: 'text-[#F6741C]' },
    { id: 'standard-14', title: 'Standard Plan', desc: 'Great for two-week campaigns.', price: '$15', color: 'border-[#2F6ED8]', iconBg: 'bg-[#2F6ED8]', days: 14, image: twelveDaysImage, text: 'text-[#2F6ED8]' },
    { id: 'standard-30', title: 'Standard Plan', desc: 'Great for two-week campaigns.', price: '$25', color: 'border-[#63A043]', iconBg: 'bg-[#63A043]', days: 30, image: thirdtyDays, text: 'text-[#63A043]' },
]


export const deals = [
    { id: 1, title: "The Ultimate Radiance Revival: Luxurious Facial...", salon: "Glamour Glow Salon", price: 29, originalPrice: 65, discount: "55% off", timeLeft: "07d 00h 00m 00s", status: "Active" },
    { id: 2, title: "Premium Hair Spa & Repair Treatment", salon: "Elite Hair Studio", price: 35, originalPrice: 80, discount: "56% off", timeLeft: "05d 12h 10m 00s", status: "Active" },
    { id: 3, title: "Relaxing Full Body Massage Therapy", salon: "Zen Relax Spa", price: 45, originalPrice: 100, discount: "55% off", timeLeft: "03d 08h 20m 00s", status: "Active" },
    { id: 4, title: "Organic Herbal Facial Care", salon: "Nature Beauty Lounge", price: 25, originalPrice: 55, discount: "54% off", timeLeft: "06d 02h 00m 00s", status: "Active" },
    { id: 5, title: "Luxury Bridal Makeup Package", salon: "Royal Makeover", price: 120, originalPrice: 250, discount: "52% off", timeLeft: "10d 00h 00m 00s", status: "Active" },
];


export const trafficData = [
    { name: 'Sat', visitors: 1000 }, { name: 'Sun', visitors: 5800 },
    { name: 'Mon', visitors: 4000 }, { name: 'Tue', visitors: 4200 },
    { name: 'Wed', visitors: 1000 }, { name: 'Thu', visitors: 7800 },
    { name: 'Fri', visitors: 11500 },
];

export const downloadData = [
    { name: 'Sat', Android: 1000, iOS: 2550 },
    { name: 'Sun', Android: 800, iOS: 1000 },
    { name: 'Mon', Android: 544, iOS: 8000 },
    { name: 'Tue', Android: 454, iOS: 1144 },
    { name: 'Wed', Android: 4524, iOS: 1454 },
    { name: 'Thu', Android: 4545, iOS: 545 },
    { name: 'Fri', Android: 1455, iOS: 5447 },
];

export const itemList = [
    { name: "Bella's Bistro", category: "Food & Drinks", status: "Pending" },
    { name: "Bella's Bistro", category: "Food & Drinks", status: "Accepted" },
    { name: "Bella's Bistro", category: "Food & Drinks", status: "Pending" },
    { name: "Bella's Bistro", category: "Food & Drinks", status: "Accepted" },
];

export const totalItems = 100;
export const rawData = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    vendor: i % 5 === 0 ? "Artisan Coffee" : "Bella's Bistro",
    email: "example123@gmail.com",
    category: "Food & Drinks",
    deals: Math.floor(Math.random() * 20),
    status: "Active",
    revenue: Math.floor(Math.random() * 1000) + 50,
}));


export const categories = [
    {
        id: 1,
        name: "Ahasan Habib",
        image: "https://i.ibb.co.com/hFkvCm7r/images-2.jpg"
    },
    {
        id: 2,
        name: "Rahim Uddin",
        image: "https://i.ibb.co.com/YF7QpJsn/images.jpg"
    },
    {
        id: 3,
        name: "Karim Hasan",
        image: "https://i.ibb.co.com/Cpfmh4S2/images-5.jpg"
    },
    {
        id: 4,
        name: "Nusrat Jahan",
        image: "https://i.ibb.co.com/G48x96v0/images-6.jpg"
    },
    {
        id: 5,
        name: "Tanvir Ahmed",
        image: "https://i.ibb.co.com/ZRt2Xkrz/images-1.jpg"
    }
];

export const plans = [
    { id: 'quickStart', title: 'Quick Start Plan', days: '7 days', defaultAmount: 10 },
    { id: 'standard', title: 'Standard Plan', days: '14 days', defaultAmount: 15 },
    { id: 'extended', title: 'Extended Plan', days: '30 days', defaultAmount: 20 },
];


export const members = [
    { id: 1, name: 'Admin User', email: 'example123@gmail.com', role: 'Super Admin', status: 'Active', canDelete: true },
    { id: 2, name: 'Name', email: 'example123@gmail.com', role: 'Content Manager', status: 'Active', canDelete: true },
    { id: 3, name: 'Name', email: 'example123@gmail.com', role: 'Vendor Manager', status: 'Active', canDelete: true },
]
