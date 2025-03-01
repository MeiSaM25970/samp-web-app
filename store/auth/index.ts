"use client";
import { IUserInfo } from "@/services/Customer/models/result.model";
import { create } from "zustand";

interface IStore {
  userInfo?: IUserInfo;
  token?: string;
  setUserInfo: (userInfo: IUserInfo) => void;
  login: (token: string) => void;
  logout: () => void;
}

const authStore = create<IStore>((set) => ({
  token: undefined,
  login: (token) => set(() => ({ token })),
  logout: () => set({ token: undefined }),
  setUserInfo: (userInfo) => set({ userInfo }),
}));

export default authStore;
