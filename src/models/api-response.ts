interface MessageType {
   ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  INFO: "INFO",
  WARNING: "WARNING",
}

export type Message = {
  type: MessageType;
  msg: string;
};

export interface ApiResponse<T> {
  success: boolean;
  message: Message[];
  data?: T;
}
