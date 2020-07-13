import {dateStringToHuman} from "./date";

describe("date", () => {
    describe("dateStringToHuman", () => {
        it("should be exposed as a named function", () => {
            expect.assertions(1);

            expect(typeof dateStringToHuman).toStrictEqual("function");
        });

        it("should return never if the date is not parseable", () => {
            expect.assertions(1);

            expect(dateStringToHuman("invalid")).toStrictEqual("Never");
        });

        it("should return never if the date is not defined", () => {
            expect.assertions(1);

            expect(dateStringToHuman(undefined)).toStrictEqual("Never");
        });

        it("should return the date in a human-readable format", () => {
            expect.assertions(1);

            expect(dateStringToHuman("2020-07-12T19:48:30.327Z")).toStrictEqual("7/12/2020");
        });
    });
});
