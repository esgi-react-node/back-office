import {useState, useEffect} from "react";

export const useFormState = (defaultValue = null) => {
    const [state, setState] = useState(defaultValue);

    const setFormState = (event) => {
        setState((event?.target?.value ?? event?.currentTarget?.value) || "");
    };

    return [state, setFormState, setState];
};

export const useFormError = (predicate, error, ...dependencies) => {
    const [hasError, setHasError] = useState(false);
    const [helperText, setHelperText] = useState("");

    useEffect(() => {
        if (dependencies.every(dependency => !dependency)) {
            setHasError(false);
            setHelperText("");
        } else if (dependencies.every(dependency => predicate(dependency))) {
            setHasError(false);
            setHelperText("");
        } else {
            setHasError(true);
            setHelperText(error);
        }
    }, dependencies);

    return [hasError, helperText];
};
