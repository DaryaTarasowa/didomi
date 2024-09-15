import {
    CONSENT_ADS,
    CONSENT_NEWSLETTER,
    CONSENT_STATISTICS,
    consentsDictionary,
} from "../dictionaries/consentsDictionary";
import { transformConsentObjectToString, transformConsentResponseToObject } from "./consentChoiceTransformer";
import { IConsent, IConsentResponse } from "../interfaces/consentTypes";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const consentsFixture = require('../../test/fixtures/consents.json');

describe('transformConsentObjectToString', () => {
    it('one positive option', () => {
        const record: IConsent = {
            name: "Darya",
            email: "darya@gmail.com",
            consentOptions: new Map<string, boolean>([[CONSENT_NEWSLETTER, true]])
        }
        const resultString = transformConsentObjectToString(record);
        expect(resultString).toEqual(consentsDictionary.get(CONSENT_NEWSLETTER));
    })

    it('two positive options', () => {
        const record: IConsent = {
            name: "Darya",
            email: "darya@gmail.com",
            consentOptions: new Map<string, boolean>([[CONSENT_NEWSLETTER, true], [CONSENT_ADS, true]])
        }
        const resultString = transformConsentObjectToString(record);
        expect(resultString).toEqual(`${consentsDictionary.get(CONSENT_NEWSLETTER)}, ${consentsDictionary.get(CONSENT_ADS)}`);
    })

    it('three positive options', () => {
        const record: IConsent = {
            name: "Darya",
            email: "darya@gmail.com",
            consentOptions: new Map<string, boolean>([[CONSENT_NEWSLETTER, true], [CONSENT_ADS, true], [CONSENT_STATISTICS, true]])
        }
        const resultString = transformConsentObjectToString(record);
        expect(resultString).toEqual(`${consentsDictionary.get(CONSENT_NEWSLETTER)}, ${consentsDictionary.get(CONSENT_ADS)}, ${consentsDictionary.get(CONSENT_STATISTICS)}`);
    })

    it('not adding negative options', () => {
        const record: IConsent = {
            name: "Darya",
            email: "darya@gmail.com",
            consentOptions: new Map<string, boolean>([[CONSENT_NEWSLETTER, true], [CONSENT_ADS, false], [CONSENT_STATISTICS, true]])
        }
        const resultString = transformConsentObjectToString(record);
        expect(resultString).toEqual(`${consentsDictionary.get(CONSENT_NEWSLETTER)}, ${consentsDictionary.get(CONSENT_STATISTICS)}`);
    })

    it('not adding options outside of dictionary', () => {
        const record: IConsent = {
            name: "Darya",
            email: "darya@gmail.com",
            consentOptions: new Map<string, boolean>([["newsLetter", true], [CONSENT_ADS, false], [CONSENT_STATISTICS, true]])
        }
        const resultString = transformConsentObjectToString(record);
        expect(resultString).toEqual(`${consentsDictionary.get(CONSENT_STATISTICS)}`);
    })

    it('working with empty lines', () => {
        const record: IConsent = {
            name: "Darya",
            email: "darya@gmail.com",
            consentOptions: new Map<string, boolean>([[CONSENT_ADS, false], [CONSENT_STATISTICS, false]])
        }
        const resultString = transformConsentObjectToString(record);
        expect(resultString).toEqual("");
    })

    it('working with empty input', () => {
        const record: IConsent = {
            name: "Darya",
            email: "darya@gmail.com",
            consentOptions: new Map<string, boolean>([])
        }
        const resultString = transformConsentObjectToString(record);
        expect(resultString).toEqual("");
    })
})

describe('transformConsentObjectToString', () => {
    it("transforms successfully", () => {
        const record: IConsentResponse = consentsFixture[0];
        const transformed = transformConsentResponseToObject(record);
        expect(transformed.consentOptions.has(CONSENT_ADS)).toEqual(true);
        expect(transformed.consentOptions.has(CONSENT_NEWSLETTER)).toEqual(true);
        expect(transformed.consentOptions.has(CONSENT_STATISTICS)).toEqual(true);
        expect(transformed.consentOptions.get(CONSENT_ADS)).toEqual(true);
        expect(transformed.consentOptions.get(CONSENT_NEWSLETTER)).toEqual(true);
        expect(transformed.consentOptions.get(CONSENT_STATISTICS)).toEqual(true);
    })

    it("ignores options outside of the dictionary", () => {
        const record: IConsentResponse = consentsFixture[9];
        const transformed = transformConsentResponseToObject(record);
        expect(transformed.consentOptions.has(CONSENT_ADS)).toEqual(false);
        expect(transformed.consentOptions.has(CONSENT_NEWSLETTER)).toEqual(true);
        expect(transformed.consentOptions.has(CONSENT_STATISTICS)).toEqual(false);
        expect(transformed.consentOptions.get(CONSENT_NEWSLETTER)).toEqual(true);
    })
})