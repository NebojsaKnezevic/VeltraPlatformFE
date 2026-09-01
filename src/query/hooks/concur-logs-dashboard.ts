import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import dayjs from "dayjs";
import { axiosClient } from "../../api/axios-client";
import type {
  ConcurLogsResponse,
  ILogsDashboardFilter,
  LogEntry,
} from "../../models/logs-dashboard-model";

const getConcurLogsProcess = async (
  ctx: QueryFunctionContext,
): Promise<ConcurLogsResponse> => {
  const filter = ctx.queryKey[ctx.queryKey.length - 1] as ILogsDashboardFilter;
  const data = await axiosClient.post(
    `/ConcurProcessLogs?page=${filter.page}&limit=${filter.limit}&orderby=geid`,
    filter,
  );
  return data.data?.data;
};

export const useConcurLogs = (filterLogs: ILogsDashboardFilter) => {
  return useQuery({
    queryKey: ["ConcurProcessLogs", filterLogs],
    queryFn: getConcurLogsProcess,
    staleTime: Infinity,
    placeholderData: (previousData) => previousData,
    select: (data) => {
      return {
        ...data,
        data: data.data.map((le: LogEntry) => {
          return {
            ...le,
            created: dayjs(le.created).format("YYYY.MM.DD HH:mm"),
          };
        }),
      };
    },
    // enabled: false,
  });
};

export const useConcurLog = (
  filterLogs: ILogsDashboardFilter,
  provisionId: number,
  enabled: boolean = false,
) => {
  return useQuery({
    queryKey: ["ConcurProcessLog", provisionId, filterLogs],
    queryFn: getConcurLogsProcess,
    staleTime: Infinity,
    placeholderData: (previousData) => previousData,
    select: (data) => {
      return {
        ...data,
        data: data.data.map((le: LogEntry) => {
          return {
            ...le,
            created: dayjs(le.created).format("YYYY.MM.DD HH:mm"),
          };
        }),
      };
    },
    enabled,
  });
};

export const useConcurPayload = (provisionId: number, enabled: boolean) => {
  console.log("code 1010", enabled);
  return useQuery({
    queryKey: ["ConcurPayload", provisionId],
    queryFn: async () => {
      const result = await axiosClient.get(
        `/ConcurProcessPayload?provisionId=${provisionId}`,
      );
      return result.data;
    },
    enabled,
    // staleTime: Infinity,
  });
};
