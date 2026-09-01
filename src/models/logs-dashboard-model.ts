export interface ILogsDashboardFilter {
  geid: string;
  extension_name: string;
  status_code: string;
  status_result: string;
  message_code: string;
  message_text: string;
  message_path: string;
  message_type: string;
  from: string;
  to: string;
  page: 1 | number;
  limit: 10 | number;
  provision_id: number | null;
}

export interface LogEntry {
  id: number;
  geid: string;
  extension_name: string;
  status_code: string;
  status_result: string;
  message_code: string;
  message_text: string;
  message_path: string;
  message_type: string;
  created: string;
  provision_id: number | null;
}

export interface ExtensionName {
  extension_name: string;
}

export interface StatusCode {
  status_code: string;
}

export interface StatusResult {
  status_result: string;
}

export interface MessageCode {
  message_code: string;
}

export interface MessageText {
  message_text: string;
}

export interface MessagePath {
  message_path: string;
}

export interface MessageType {
  message_type: string;
}

export interface DateRange {
  min_date: string;
  max_date: string;
}

export interface ConcurLogsResponse {
  total: number;
  page: number;
  limit: number;
  data: LogEntry[];
  extensionNames: ExtensionName[];
  statusCodes: StatusCode[];
  statusResults: StatusResult[];
  messageCodes: MessageCode[];
  messageTexts: MessageText[];
  messagePaths: MessagePath[];
  messageTypes: MessageType[];
  dateRange: DateRange[];
}

interface MsgType {
  ERROR: "ERROR";
  SUCCESS: "SUCCESS";
  INFO: "INFO";
  WARNING: "WARNING";
}

export type Message = {
  type: MsgType;
  msg: string;
};

export interface ApiResponse<T> {
  success: boolean;
  message: Message[];
  data?: T;
}

export const DEFAULT_LOGS_DASHBOARD_FILTER: ILogsDashboardFilter = {
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
  limit: 12,
  provision_id: 0,
};
