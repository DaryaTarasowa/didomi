import { request } from "../utils/network"

export const getConsents = () =>
    request({
        url: `consents`,
        method: "GET",
    })

export const addConsent = () =>
    request({
        url: `consents`,
        method: "POST"
    })

