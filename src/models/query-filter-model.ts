export interface IFilter {
  page: number | 1;
  limit: number | 5;
  orderby: string | "GEID";
  geid?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  country?: string;
  payroll?: string;
}