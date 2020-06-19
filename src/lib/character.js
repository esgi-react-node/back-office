export function isDigitCharacter(character) {
    if (typeof character !== "string") {
        character = String(character);
    }

    return "0123456789".includes(character[0]);
}
