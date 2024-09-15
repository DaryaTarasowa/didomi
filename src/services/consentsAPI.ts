import { request } from "../utils/network"

export const getConsents = () =>
    request({
        url: `consents`,
        method: "GET",
    })

export const addConsent = (data: any) =>
    request({
        url: `consents`,
        method: "POST",
        data
    })

