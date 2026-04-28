import { Menu } from "lucide-react";

const Header = ({ setSidebarOpen }) => {
    return (
        <header className="w-full flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2.5 bg-slate-50 text-slate-600 rounded-md">
                    <Menu size={20} />
                </button>
            </div>
        </header>
    );
};

export default Header;