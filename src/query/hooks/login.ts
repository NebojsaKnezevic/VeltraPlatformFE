import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "../../api/axios-client";
import type { ApiResponse } from "../../models/api-response";
import type { UserModel } from "../../models/user-model";

async function loginUser(email: string, password: string) {
  const { data } = await axiosClient.post("/login", { email, password });
  return data;
}

interface LoginPayload {
    email: string;
    password: string;
}

export function useLogin() {
  return useMutation<ApiResponse<UserModel>, Error, LoginPayload>({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
  });
}
