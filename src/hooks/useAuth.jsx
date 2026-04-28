import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const useAuth = () => {
  const { user } = useSelector((state) => state.auth);
  const token = Cookies.get("accessToken");

  if (user && token) {
    return true;
  }

  return false;
};

export default useAuth;