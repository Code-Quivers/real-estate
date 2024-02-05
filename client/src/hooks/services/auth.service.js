import { axiosInstance } from "../../helpers/axios/axiosInstance";
import { getAuthKey, getBaseUrl } from "@/configs/envConfig";
import { decodedToken } from "@/utils/jwtVerify";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }) => {
  return setToLocalStorage(getAuthKey(), accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(getAuthKey());

  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(getAuthKey());
  return !!authToken;
};

export const removeUserInfo = (key) => {
  return localStorage.removeItem(key);
};

export const getNewAccessToken = async () => {
  const response = await axiosInstance({
    url: `${getBaseUrl()}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  return response.data;
};
