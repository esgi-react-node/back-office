export function isValidPassword(password) {
    return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}/.test(password);
}
