"use client";
import authStore from "@/store/auth";
import { CustomsService } from "@/services/Customs/Customs.service";

export const useUserInfo = () => {
  const { setUserInfo } = authStore();

  const fetchUserInfo = async () => {
    try {
      const { getUserDatielByToken } = new CustomsService();
      const res = await getUserDatielByToken();
      if (res && res.data && res.data.data) {
        setUserInfo && setUserInfo(res.data.data);
      }
    } catch (err) {}
  };

  return { fetchUserInfo };
};
