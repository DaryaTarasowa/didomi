import { useMutation } from "@tanstack/react-query";
import { IConsentRequest } from "../interfaces/consentIntefaces.ts";
import { addConsent } from "../services/consentsAPI.ts";

export const useConsentMutation = () => {
    return useMutation({
        mutationFn: (consentsData: IConsentRequest) => addConsent(consentsData),
    });
};