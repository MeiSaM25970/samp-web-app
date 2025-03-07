"use client";
import { IUserInfo } from "@/services/BaseInfo/models";
import { ReactNode } from "react";
import { create } from "zustand";

interface IAlert {
  title: string | ReactNode;
}

interface IStore {
  loading: boolean;
  alert?: IAlert;
  userInfo?: IUserInfo;
  setUserInfo?: (userInfo: IUserInfo) => void;
}

const useGlobalStore = create<IStore>((set) => ({
  loading: false,
  setAlertNotification: (alert?: IAlert) => set(() => ({ alert })),
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
}));

export default useGlobalStore;
