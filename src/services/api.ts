import axios, { type AxiosRequestConfig, type AxiosError, type AxiosResponse, type RawAxiosResponseHeaders, type AxiosResponseHeaders } from 'axios';

export interface ApiResponse<T = unknown> {
    body: T;
    status: number;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
}

interface CachedResponse {
    data: unknown;
    status: number;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
}

const cache: Record<string, AxiosResponse> = {};
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

class Api {
    async get<T = unknown>(
        resource: string,
        params: Record<string, string | number | boolean> = {},
        cacheEnable = true,
        token: string | null = null
    ): Promise<ApiResponse<T>> {
        const config: AxiosRequestConfig = {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            }
        };
        return this.request<T>(resource, params, config, cacheEnable);
    }

    private async request<T = unknown>(
        resource: string,
        params: Record<string, string | number | boolean> = {},
        config: AxiosRequestConfig = {},
        cacheEnable = false
    ): Promise<ApiResponse<T>> {
        const headers = {
            "Content-Type": "application/json",
            ...config.headers,
        };

        const axiosConfig: AxiosRequestConfig = {
            ...config,
            headers,
            method: 'get',
        };

        try {
            let res: AxiosResponse;
            let url = `${BASE_URL}${resource}`;

            const queryString = Object.keys(params)
                .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                .join("&");
            if (queryString) {
                url += `?${queryString}`;
            }

            axiosConfig.url = url;

            if (cacheEnable && cache[url]) {
                res = cache[url];
            } else {
                const response = await axios(axiosConfig);
                res = response;
                if (cacheEnable) {
                    cache[url] = res;
                }
            }

            return this.successResponse<T>(res);
        } catch (error) {
            return this.errorResponse(error as AxiosError);
        }
    }

    successResponse<T = unknown>(response: AxiosResponse): ApiResponse<T> {
        return this.response<T>(response);
    }

    errorResponse(error: AxiosError): never {
        if (error?.code === "ERR_NETWORK") {
            const networkResponse: CachedResponse = {
                data: { message: "Network error found!" },
                status: 503,
                headers: {},
            };
            throw this.response(networkResponse);
        }
        const errorData: CachedResponse = error.response || {
            data: error.message,
            status: error.status || 500,
            headers: {},
        };
        throw this.response(errorData);
    }

    response<T = unknown>({ data, status, headers }: CachedResponse | AxiosResponse): ApiResponse<T> {
        return {
            body: data as T,
            status,
            headers,
        };
    }
}

export default new Api();
