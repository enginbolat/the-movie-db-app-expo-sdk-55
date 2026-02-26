import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector } from 'react-redux';

import { setupListeners } from '@reduxjs/toolkit/query/react';
import { api } from './slice/request';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer
    },
    middleware: (defaultMiddleware) => defaultMiddleware().concat(api.middleware)
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useReduxDispatch<AppDispatch>();