import axios from "axios";
import { getAuthKey } from "@/configs/envConfig";
import { getNewAccessToken, removeUserInfo } from "@/hooks/services/auth.service";
import { setToLocalStorage } from "@/utils/local-storage";

export const axiosInstance = axios.create();
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers.post.Accept = "application/json";
axiosInstance.defaults.timeout = 60000;
// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem(getAuthKey());
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  // @ts-ignore
  function (response) {
    const responseObject = {
      data: response?.data,
      meta: response?.data?.meta,
      status: response?.data?.statusCode,
      message: response?.data?.message,
      success: response?.data?.success,
    };

    return responseObject;
  },
  async function (error) {
    const config = error?.config;

    if (error?.response?.status === 403 && !config?.sent) {
      config.sent = true;
      const response = await getNewAccessToken();

      const accessToken = response?.data?.accessToken;
      config.headers["Authorization"] = accessToken;
      setToLocalStorage(getAuthKey(), accessToken);
      return axiosInstance(config);
    } else if (error?.response?.status === 401 && !config?.sent) {
      //31
      config.sent = true;

      removeUserInfo(getAuthKey());
      const responseObject = {
        statusCode: error?.response?.status || 500,
        message: error?.response?.data?.message || "Something went wrong!!",
        errorMessages: error?.response?.data?.errorMessages,
      };

      return Promise.reject(responseObject);
    } else {
      const responseObject = {
        statusCode: error?.response?.status || 500,
        message: error?.response?.data?.message || "Something went wrong!!",
        errorMessages: error?.response?.data?.errorMessages,
      };

      return Promise.reject(responseObject);
    }
  },
);
