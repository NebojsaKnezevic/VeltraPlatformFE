import { create } from "zustand";
import type { UserModel } from "../models/user-model";
import type { ApiResponse } from "../models/api-response";

interface AuthStore {
  user?: ApiResponse<UserModel>;
  setUser: (data: ApiResponse<UserModel>) => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  return {
    user: undefined,
    setUser: (data: ApiResponse<UserModel>) => set({ user: data }),
  };
});



