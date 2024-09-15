export type TConsentOptions = Map<string, boolean>

export interface IConsent {
    name: string,
    email: string,
    consentOptions: TConsentOptions
}

export interface IConsentResponse {
    name: string,
    email: string,
    consentOptions: {[key: string]: boolean}[]
}