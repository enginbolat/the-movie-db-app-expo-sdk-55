import { createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig } from 'axios';

export type NetworkLog = {
  id: number;
  method?: string;
  type: 'request' | 'response' | 'error';
  url?: string;
  data?: any;
  body?: object;
  headers: any;
  date?: string;
};

export let requestLogs: NetworkLog[] = [];
let idCounter = 0;

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    requestLogs.push({
      id: ++idCounter,
      type: 'request',
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      body: config.data,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
      },
      date: new Date().toISOString(),
    });

    return config;
  },
  error => Promise.reject(error),
);

// RESPONSE interceptor
axiosInstance.interceptors.response.use(
  response => {
    requestLogs.push({
      id: ++idCounter,
      type: 'response',
      method: response.config.method?.toUpperCase(),
      url: response.config.url,
      data: response.data,
      headers: {
        ...response.headers,
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      date: new Date().toISOString(),
    });
    return response.data;
  },
  error => {
    requestLogs.push({
      id: ++idCounter,
      type: 'error',
      method: error.config?.method?.toUpperCase(),
      url: error.config?.url,
      data: error.message,
      headers: error.headers,
      date: new Date().toISOString(),
    });
    return Promise.reject(error);
  },
);

export default axiosInstance;

type IAxiosBaseQuery = {
  url: AxiosRequestConfig['url'];
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
};

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
    async ({ url, method, data, params, headers }: IAxiosBaseQuery) => {
      try {
        const result = await axiosInstance({
          url: baseUrl + url,
          method,
          data,
          params,
          headers: {
            ...headers,
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
          },
        });
        return { data: result };
      } catch (axiosError: any) {
        const err = axiosError;
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      }
    };

export const api = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
