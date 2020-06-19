import {isDigitCharacter} from "./character.js";

describe("character.js", () => {
    it("should return true if the character is a digit", () => {
        expect.assertions(20);

        expect(isDigitCharacter("0")).toStrictEqual(true);
        expect(isDigitCharacter("1")).toStrictEqual(true);
        expect(isDigitCharacter("2")).toStrictEqual(true);
        expect(isDigitCharacter("3")).toStrictEqual(true);
        expect(isDigitCharacter("4")).toStrictEqual(true);
        expect(isDigitCharacter("5")).toStrictEqual(true);
        expect(isDigitCharacter("6")).toStrictEqual(true);
        expect(isDigitCharacter("7")).toStrictEqual(true);
        expect(isDigitCharacter("8")).toStrictEqual(true);
        expect(isDigitCharacter("9")).toStrictEqual(true);

        expect(isDigitCharacter(0)).toStrictEqual(true);
        expect(isDigitCharacter(1)).toStrictEqual(true);
        expect(isDigitCharacter(2)).toStrictEqual(true);
        expect(isDigitCharacter(3)).toStrictEqual(true);
        expect(isDigitCharacter(4)).toStrictEqual(true);
        expect(isDigitCharacter(5)).toStrictEqual(true);
        expect(isDigitCharacter(6)).toStrictEqual(true);
        expect(isDigitCharacter(7)).toStrictEqual(true);
        expect(isDigitCharacter(8)).toStrictEqual(true);
        expect(isDigitCharacter(9)).toStrictEqual(true);
    });

    it("should return false if the character is not a digit", () => {
        expect.hasAssertions();

        for (const character of "abcdefghijklmnoparstuvwxyzABCDEFGHIJKLMNOPARSTUVWXYZ") {
            expect(isDigitCharacter(character)).toStrictEqual(false);
        }
    });
});
