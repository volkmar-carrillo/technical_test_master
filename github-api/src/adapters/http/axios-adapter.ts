import { AxiosRequestConfig } from 'axios';

export interface AxiosAdapter {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<any>;
}
