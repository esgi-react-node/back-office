import {isCreditCardNumberValid} from "./credit-card.js";

describe("credit-card.js", () => {
    it("should return true if the credit card number is valid", () => {
        expect.assertions(3);
        expect(isCreditCardNumberValid("4762117379087895")).toStrictEqual(true);
        expect(isCreditCardNumberValid("4762 1173 7908 7895")).toStrictEqual(true);
        expect(isCreditCardNumberValid(4762117379087895)).toStrictEqual(true);
    });

    it("should return false if the credit card number is valid", () => {
        expect.assertions(3);
        expect(isCreditCardNumberValid("4762117379087896")).toStrictEqual(false);
        expect(isCreditCardNumberValid("4762 1173 7908 7896")).toStrictEqual(false);
        expect(isCreditCardNumberValid(4762117379087896)).toStrictEqual(false);
    });
});
