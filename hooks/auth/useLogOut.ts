import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth";
import { ROUTES } from "@/constants/Routes";

export const useLogout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    localStorage.clear();
    logout();
    navigate(ROUTES.login);
  };

  return { logoutHandler };
};
