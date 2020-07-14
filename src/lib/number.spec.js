import {numberToCurrency, numberToDecimal} from "./number";

describe("number", () => {
    describe("numberToCurrency", () => {
        it("should be exposed as a named function", () => {
            expect.assertions(1);

            expect(typeof numberToCurrency).toStrictEqual("function");
        });

        it("should return the currency", () => {
            expect.assertions(1);

            expect(numberToCurrency(12.34)).toStrictEqual("€12.34");
        });
    });

    describe("numberToDecimal", () => {
        it("should be exposed as a named function", () => {
            expect.assertions(1);

            expect(typeof numberToDecimal).toStrictEqual("function");
        });

        it("should return the formatted decimal number", () => {
            expect.assertions(1);

            expect(numberToDecimal(2)).toStrictEqual("2.00");
        });
    });
});
