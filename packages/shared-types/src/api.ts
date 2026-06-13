export type ApiResponse<T = undefined> =
  | { success: true; data?: T }
  | { success: false; error: string };
