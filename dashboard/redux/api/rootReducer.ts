import themeConfigSlice from '@/store/themeConfigSlice';
import { baseApi } from './baseApi';

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    themeConfig: themeConfigSlice,
};
