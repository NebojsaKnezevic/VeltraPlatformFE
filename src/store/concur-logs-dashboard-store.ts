import { create } from "zustand";
import type { ILogsDashboardFilter } from "../models/logs-dashboard-model";

interface ILogsDashboardStore {
  logsFilter: ILogsDashboardFilter;
  setLogsFilter: (data: ILogsDashboardFilter) => void;
}

export const useLogsDashboardStore = create<ILogsDashboardStore>((set) => {
  return {
    logsFilter: {
      geid: "",
      extension_name: "",
      status_code: "",
      status_result: "",
      message_code: "",
      message_text: "",
      message_path: "",
      message_type: "",
      from: "",
      to: "",
      page: 1,
      limit: 10,
    },
    setLogsFilter: (data: ILogsDashboardFilter) => set({ logsFilter: data }),
  };
});
