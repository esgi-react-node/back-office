export const numberToCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR"
    }).format(value);
};
