export const numberToCurrency = value => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR"
}).format(value);

export const numberToDecimal = value => new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
}).format(value);
