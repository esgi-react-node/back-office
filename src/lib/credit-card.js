import {isDigitCharacter} from "./character.js";

/**
 * @summary Check if a credit card is valid or not.
 * @param {string|number} creditCardNumber The credit card number to check.
 * @return {boolean} Whether the credit card is valid or not.
 * @example
 * isCreditCardNumberValid(123456789);
 * isCreditCardNumberValid("123456789");
 */
export function isCreditCardNumberValid(creditCardNumber) {
    if (typeof creditCardNumber !== "string") {
        creditCardNumber = String(creditCardNumber);
    }

    let index = 0;
    let sum = 0;

    for (const character of creditCardNumber) {
        if (!isDigitCharacter(character)) {
            continue;
        }

        let digit = parseInt(character) || 0;

        if (index % 2 === 0) {
            digit *= 2;
        }

        if (digit > 9) {
            digit -= 9;
        }

        sum += digit;
        index++;
    }

    return sum % 10 === 0;
}
