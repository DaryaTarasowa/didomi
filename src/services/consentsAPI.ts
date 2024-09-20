import { request } from "./network"
import { IConsentRequest } from "../interfaces/consentIntefaces.ts";

export const getConsents = () =>
    request({
        url: `consents`,
        method: "GET",
    })

export const addConsent = (data: IConsentRequest) =>
    request({
        url: `consents`,
        method: "PUT",
        data
    })

