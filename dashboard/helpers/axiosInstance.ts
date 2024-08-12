/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import { IGenericErrorResponse, ResponseSuccessType } from '@/types';
import { getAuthKey } from './envConfig';
import { removeUserInfo } from './hooks/auth.helper';


export const axiosInstance = axios.create();
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.post.Accept = 'application/json';
axiosInstance.defaults.timeout = 60000;
// Add a request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem(getAuthKey() as string);
        if (accessToken) {
            config.headers.Authorization = accessToken;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    // @ts-ignore
    function (response) {
        const responseObject: ResponseSuccessType = {
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
            // // const response = await getNewAccessToken();
            // const accessToken = response?.data?.accessToken;
            // config.headers["Authorization"] = accessToken;
            // setToLocalStorage(getAuthKey(), accessToken);
            // return axiosInstance(config);

            removeUserInfo(getAuthKey());
        } else {
            const responseObject: IGenericErrorResponse = {
                statusCode: error?.response?.status || 500,
                message: error?.response?.data?.message || 'Something went wrong!!',
                errorMessages: error?.response?.data?.errorMessages,
            };

            return Promise.reject(responseObject);
        }
    }
);
