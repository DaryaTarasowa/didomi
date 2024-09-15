import {
    CONSENT_ADS,
    CONSENT_NEWSLETTER,
    CONSENT_STATISTICS,
    consentsDictionary,
} from "../dictionaries/consentsDictionary";
import {
    transformConsentOptionsToString,
    transformConsentsForUI
} from "./consentChoiceTransformer";
import { TConsentOptions } from "../interfaces/consentTypes";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const consentsFixture = require('../../test/fixtures/consents.json');

describe('transformConsentOptionsToString', () => {
    it('one positive option', () => {
        const record: TConsentOptions = ["newsletter"];
        const resultString = transformConsentOptionsToString(record);
        expect(resultString).toEqual(consentsDictionary.get(CONSENT_NEWSLETTER));
    })

    it('two positive options', () => {
        const record: TConsentOptions = ["newsletter", "targetedAds"];
        const resultString = transformConsentOptionsToString(record);
        expect(resultString).toEqual(`${consentsDictionary.get(CONSENT_NEWSLETTER)}, ${consentsDictionary.get(CONSENT_ADS)}`);
    })

    it('three positive options', () => {
        const record: TConsentOptions = ["newsletter", "targetedAds", "statistics"];
        const resultString = transformConsentOptionsToString(record);
        expect(resultString).toEqual(`${consentsDictionary.get(CONSENT_NEWSLETTER)}, ${consentsDictionary.get(CONSENT_ADS)}, ${consentsDictionary.get(CONSENT_STATISTICS)}`);
    })

    it('working with empty lines', () => {
        const record: TConsentOptions = [];
        const resultString = transformConsentOptionsToString(record);
        expect(resultString).toEqual("");
    })
})

describe('transformConsentsForUI', () => {
    it("keeps only records with correct consents given", () => {
        const transformed = transformConsentsForUI(consentsFixture);
        expect(transformed.length).toEqual(8);
    })
    it("ignores records with wrong options", () => {
        const brokenRecord = consentsFixture[10];
        const validRecord = consentsFixture[0];
        const result = transformConsentsForUI([brokenRecord, validRecord]);
        expect(result.length).toEqual(1);
    })
})