import 'reflect-metadata';
import axios, { AxiosRequestConfig } from 'axios';
import { injectable } from 'inversify';
import { AxiosAdapter } from './axios-adapter';

@injectable()
export class AxiosAdapterImpl implements AxiosAdapter {
    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<any> {
        try {
            const response = await axios.get<T>(url, { ...config });
            return response;
        } catch (error) {
            throw new Error(`HTTP GET request to ${url} failed: ${error}`);
        }
    }
}
