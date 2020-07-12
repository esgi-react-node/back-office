import {isValidEmail} from "./email";

describe("email", () => {
    it("should be exposed as a named function", () => {
        expect.assertions(1);

        expect(typeof isValidEmail).toStrictEqual("function");
    });

    it("should return true for a valid email", () => {
        expect.assertions(1);

        expect(isValidEmail("valid@email.com")).toStrictEqual(true);
    });

    it("should return false for an invalid email", () => {
        expect.assertions(1);

        expect(isValidEmail("invalid@email")).toStrictEqual(false);
    });
});
