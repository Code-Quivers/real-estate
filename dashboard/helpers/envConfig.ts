export const getBaseUrl = (): string => {
    return process.env.NEXT_PUBLIC_API_BASE_URL as string;
};
export const getAuthKey = () => {
    return process.env.NEXT_PUBLIC_API_AUTH_KEY as string;
};

export const fileUrlKey = () => {
    return process.env.NEXT_PUBLIC_FILE_URL_KEY as string;
};
