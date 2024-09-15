import { IConsent, IConsentResponse, TConsentOptions } from "../interfaces/consentTypes";

import { consentsDictionary } from "../dictionaries/consentsDictionary";

export function transformConsentsForUI(data: IConsentResponse[]): IConsent[] {
    return data.reduce((acc: IConsent[], record: IConsentResponse) => {
        const sanitizedConsentOptions = transformConsentOptionsToString(record.consentOptions!);
        if (sanitizedConsentOptions?.length) {
            acc.push({
                ...record,
                consentOptionsString: sanitizedConsentOptions,
            })
        }
        return acc;
    }, []);
}

export function transformConsentOptionsToString(options: TConsentOptions): string {
    return options?.map((option) => consentsDictionary.get(option)).join(", ");
}