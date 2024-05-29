import axios, { AxiosRequestConfig } from 'axios';
import { AxiosAdapterImpl } from '../../src/adapters/http/axios-adapter-impl';

describe('AxiosAdapterImpl', () => {
    let axiosAdapter: AxiosAdapterImpl;

    beforeEach(() => {
        axiosAdapter = new AxiosAdapterImpl();
    });

    describe('get', () => {
        it('should send a GET request and return the response data', async () => {
            const url = 'https://example.com/api';
            const options: AxiosRequestConfig = { headers: { 'Content-Type': 'application/json' } };

            spyOn(axios, 'get').and.returnValue(Promise.resolve(true));

            const result = await axiosAdapter.get(url, options);

            expect(axios.get).toHaveBeenCalledWith(url, options);
            expect(result).toEqual(true);
        });

        it('should throw an error if the GET request fails', async () => {
            const url = 'https://example.com/api';
            const options: AxiosRequestConfig = { headers: { 'Content-Type': 'application/json' } };
            const error = new Error(`HTTP GET request to ${url} failed: Test`);

            spyOn(axios, 'get').and.returnValue(Promise.reject('Test'));

            await expectAsync(axiosAdapter.get(url, options)).toBeRejectedWithError(error.message);
            expect(axios.get).toHaveBeenCalledWith(url, options);
        });
    });
});
