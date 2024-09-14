import axios, { AxiosRequestConfig } from "axios";
import HttpRequestMock from 'http-request-mock';
import consentsFixture from "../../test/fixtures/consents.json";

const { VITE_CONSENTS_API_URL } = import.meta.env; //TODO add env validation

if (import.meta.env.MODE === "development") {
    const mocker = HttpRequestMock.setup();
    mocker.get(`${ VITE_CONSENTS_API_URL }/consentsxx`, consentsFixture);
}

const client = axios.create({
    baseURL: `${ VITE_CONSENTS_API_URL }/`
})

export const request = async (config: AxiosRequestConfig<any>) => {
    const response = await client.request(config);
    return response?.data;
};