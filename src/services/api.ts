import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';

const cache: Record<string, any> = {};
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

class Api {
    async get(resource: string, params: Record<string, any> = {}, cacheEnable = true, token: string | null = null) {
        const config: AxiosRequestConfig = {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            }
        };
        return this.request(resource, params, config, cacheEnable);
    }

    private async request(
        resource: string,
        params: Record<string, any> = {},
        config: AxiosRequestConfig = {},
        cacheEnable = false
    ) {
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
            let res: any = {};
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

            return this.successResponse(res);
        } catch (error) {
            return this.errorResponse(error as AxiosError | any);
        }
    }

    successResponse(response: any) {
        return this.response(response);
    }

    errorResponse(error: any): never {
        if (error?.code === "ERR_NETWORK") {
            const networkResponse = {
                data: { message: "Network error found!" },
                status: 503,
                headers: {},
            };
            throw this.response(networkResponse);
        }
        throw this.response(error.response || error);
    }

    response({ data, status, headers }: any) {
        return {
            body: data,
            status,
            headers,
        };
    }
}

export default new Api();
