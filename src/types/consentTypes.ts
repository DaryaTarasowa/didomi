export interface IConsent {
    name: string,
    email: string,
    newsletter?: boolean,
    targetedAds?: boolean,
    statistics?: boolean
}