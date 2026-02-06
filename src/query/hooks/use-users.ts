// src/query/hooks/useUsers.ts
import { useQuery, type QueryFunctionContext  } from "@tanstack/react-query";
import { axiosClient } from "../../api/axios-client";

const getUsers = async (ctx: QueryFunctionContext) => {
  const [, x] = ctx.queryKey;
  const {data} = await axiosClient.get(`/concur?limit=${x}`);
  return data;
};

export const useUsers = (x:number) => {
  return useQuery({
    queryKey: ["workday", x],
    queryFn: getUsers,
    // staleTime: Infinity
  });
};

// export const useUsers1 = (x:number) => {
// return useQuery({
//   queryKey: ['todos', todoId],
//   queryFn: async () => {
//     const response = await fetch('/todos/' + todoId)
//     if (!response.ok) {
//       throw new Error('Network response was not ok')
//     }
//     return response.json()
//   },
// })
// };