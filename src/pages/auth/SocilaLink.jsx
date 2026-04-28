import { NavLink } from "react-router-dom";
import { images } from "../../assets/image";
const SocialLink = () => {
    return (
        <div className="flex gap-4">
            <NavLink to={`${import.meta.env.VITE_BASE_URL}/auth/google`}
                className="flex-1 flex items-center justify-center gap-2 border border-slate-200 py-3 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200">
                <img
                    src={images.googleIcon}
                    className="w-5 h-5"
                    alt="Google"
                />
                <span className="text-sm font-medium text-slate-700">
                    Google
                </span>
            </NavLink>
            <NavLink to={`https://appleid.apple.com/auth/authorize?client_id=${import.meta.env.VITE_APPLE_WEB_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_APPLE_WEB_REDIRECT_URI}&scope=email+name&response_type=code+id_token&response_mode=form_post`}
                className="flex-1 flex items-center justify-center gap-2 border border-slate-200 py-3 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200">
                <img
                    src={images.appleIcon}
                    className="w-5 h-5"
                    alt="Apple"
                />
                <span className="text-sm font-medium text-slate-700">
                    Apple
                </span>
            </NavLink>
        </div>
    );
};

export default SocialLink;
