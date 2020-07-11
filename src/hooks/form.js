export const useFormInputSetter = setter => event => {
    if (event?.target?.value) {
        setter(event.target.value);
    } else if (event?.currentTarget?.value) {
        setter(event.currentTarget.value);
    }
};

export const useFormInputWithError = ({onValue, onError, validator, error}) => event => {
    const formValue = event?.target?.value ?? event?.currentTarget?.value ?? "";

    onValue(formValue);

    if (validator(formValue)) {
        onError("");
    } else {
        onError(error);
    }
};
