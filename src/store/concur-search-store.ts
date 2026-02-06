import { create } from "zustand";
// import type { UserModel } from "../models/user-model";
// import type { ApiResponse } from "../models/api-response";
import type { IFilter } from "../models/query-filter-model";

interface ConcurSearchStore {
  queryFilter: IFilter;
  setQueryFilter: (data: IFilter) => void;
}

export const useConcurSearchStore = create<ConcurSearchStore>((set) => {
  return {
    queryFilter: {
      page: 1,
      limit: 5,
      orderby: "GEID",
      geid: "",
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      payroll: "",
    },
    setQueryFilter: (data: IFilter) => set({ queryFilter: data }),
  };
});
