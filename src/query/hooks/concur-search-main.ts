import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import { axiosClient } from "../../api/axios-client";
import type { IFilter } from "../../models/query-filter-model";
import type { ApiResponse } from "../../models/api-response";
import type { IHrgtModel } from "../../models/hrgt-model";
import type { IConcurModel } from "../../models/concur-model";
import type { IHRGTdwModel } from "../../models/hrgtdw-model";

function x<T>(table: string) {
  return async (ctx: QueryFunctionContext): Promise<ApiResponse<T[]>> => {
    const [, filter] = ctx.queryKey as [string, IFilter];
    const { data } = await axiosClient.get(`/${table}`, {
      params: { ...filter },
    });
    return data;
  };
}

export function useHrgtUsers(filter: IFilter) {
  return useQuery<ApiResponse<IHrgtModel[]>>({
    queryKey: ["hrgtUsers", filter],
    queryFn: x<IHrgtModel>("hrgt"),
    staleTime: Infinity,
    enabled: false,
  });
}

export function useConcurUsers(filter: IFilter) {
  return useQuery<ApiResponse<IConcurModel[]>>({
    queryKey: ["concurUsers", filter],
    queryFn: x("concur"),
    staleTime: Infinity,
    enabled: false,
  });
}

export function useHrgtdwUsers(filter: IFilter) {
  return useQuery<ApiResponse<IHRGTdwModel[]>>({
    queryKey: ["concurUsers", filter],
    queryFn: x<IHRGTdwModel>("hrgtdw"),
    staleTime: Infinity,
    enabled: false,
  });
}
