import {isValidPassword} from "./password";

describe("password", () => {
    it("should be exposed as a named function", () => {
        expect.assertions(1);

        expect(typeof isValidPassword).toStrictEqual("function");
    });

    it("should return true with a valid password", () => {
        expect.assertions(1);

        expect(isValidPassword("abcABC123!@#")).toStrictEqual(true);
    });

    it("should return false with a password of less than eight characters", () => {
        expect.assertions(1);

        expect(isValidPassword("aA1!")).toStrictEqual(false);
    });

    it("should return false with a password missing lowercase letters", () => {
        expect.assertions(1);

        expect(isValidPassword("ABC123!@#")).toStrictEqual(false);
    });

    it("should return false with a password missing uppercase letters", () => {
        expect.assertions(1);

        expect(isValidPassword("abc123!@#")).toStrictEqual(false);
    });

    it("should return false with a password missing digits letters", () => {
        expect.assertions(1);

        expect(isValidPassword("abcABC!@#")).toStrictEqual(false);
    });

    it("should return false with a password missing symbols letters", () => {
        expect.assertions(1);

        expect(isValidPassword("abcABC123")).toStrictEqual(false);
    });
});
