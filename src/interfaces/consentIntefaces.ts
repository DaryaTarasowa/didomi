import { CONSENT_NEWSLETTER, CONSENT_ADS, CONSENT_STATISTICS } from "../dictionaries/consentsDictionary.ts";

export type TConsentOptions =  (typeof CONSENT_NEWSLETTER | typeof CONSENT_ADS | typeof CONSENT_STATISTICS)[];

export interface IConsentResponse {
    name: string,
    email: string,
    consentOptions?: TConsentOptions
}

export interface IConsentRequest {
    name: string,
    email: string,
    consentOptions?: TConsentOptions
}

export interface IConsent extends IConsentResponse{
    consentOptionsString?: string
}