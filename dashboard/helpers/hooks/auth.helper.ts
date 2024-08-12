import { axiosInstance } from '../axiosInstance';
import { getAuthKey, getBaseUrl } from '../envConfig';
import { getFromLocalStorage, setToLocalStorage } from '../utils/local-storage';
import { decodedToken } from './jwtVerify';

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
    return setToLocalStorage(getAuthKey(), accessToken as string);
};

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(getAuthKey());

    if (authToken) {
        const decodedData = decodedToken(authToken);
        return decodedData;
    } else {
        return '';
    }
};

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(getAuthKey());
    return !!authToken;
};

export const removeUserInfo = (key: string) => {
    return localStorage.removeItem(key);
};

export const getNewAccessToken = async () => {
    const response = await axiosInstance({
        url: `${getBaseUrl()}/auth/refresh-token`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });
    return response.data;
};
