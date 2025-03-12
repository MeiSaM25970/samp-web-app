import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth/index";
import { USER_JWT_TOKEN } from "@/constants/localStorage";
import { ROUTES } from "@/constants/Routes";
import { ILoginResult } from "@/services/BaseInfo/models";
export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const loginHandler = async ({ token }: ILoginResult) => {
    localStorage.setItem(USER_JWT_TOKEN, token);
    login(token);
    navigate(ROUTES.home);
  };

  return { loginHandler };
};
