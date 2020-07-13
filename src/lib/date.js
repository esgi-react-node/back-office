export const dateStringToHuman = (dateString) => {
    if (!dateString) {
        return "Never";
    }

    const date = new Date(dateString);

    if (date instanceof Date && !Number.isNaN(date.getTime())) {
        return date.toLocaleString("en-US", {
            day: "numeric",
            month: "numeric",
            year: "numeric"
        });
    }

    return "Never";
};
