export const CONSENT_NEWSLETTER = "newsletter";
export const CONSENT_ADS = "targetedAds";
export const CONSENT_STATISTICS = "statistics";

export const consentsDictionary = new Map<string, string>([
    [CONSENT_NEWSLETTER, 'Receive newsletter'],
    [CONSENT_ADS, 'Be shown targeted ads'],
    [CONSENT_STATISTICS, 'Contribute to anonymous visit statistics'],
])