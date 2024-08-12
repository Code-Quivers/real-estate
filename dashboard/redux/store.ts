import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import { reducer } from './api/rootReducer';

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
