import { IConsent, IConsentResponse } from "../interfaces/consentTypes";

import { consentsDictionary } from "../dictionaries/consentsDictionary";

export function transformConsentObjectToString(record: IConsent): string { // TODO refactor
    const resultArray: string[] = [];
    for (const [key, value] of record.consentOptions) {
        if (key && value && consentsDictionary.has(key)) {
            resultArray.push(consentsDictionary.get(key));
        }
    }
    return resultArray.join(", ");
}

export function transformConsentResponseToObject(responseObject: IConsentResponse): IConsent {
    const options = responseObject.consentOptions;
    const resultingMap = new Map<string, boolean>;

    options.forEach((option) => {
        const key = Object.keys(option)[0];
        const value = Object.values(option)[0];
        if (consentsDictionary.has(key)) {
            resultingMap.set(key, value);
        }
    });

    const resultObject: IConsent = {
        name: responseObject.name,
        email: responseObject.email,
        consentOptions: resultingMap
    }

    return resultObject
}