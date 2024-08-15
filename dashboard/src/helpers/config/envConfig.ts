export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9000/api/v1";
};

export const getAuthKey = (): string => {
  return process.env.NEXT_PUBLIC_API_AUTH_KEY!;
};

export const sideBarModeKey = (): string => {
  return process.env.NEXT_PUBLIC_SIDEBAR_MODE_KEY!;
};

export const fileUrlKey = (): string => {
  return process.env.NEXT_PUBLIC_FILE_URL_KEY!;
};
