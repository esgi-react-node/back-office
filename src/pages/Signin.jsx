import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const Signin = () => {
    const onSubmit = (event) => {
        event.preventDefault();

        console.log("Form submitted.");
    };

    return (
        <form onSubmit={onSubmit}>
            <FormControl>
                <TextField id="email" name="email" label="Email address" />
            </FormControl>

            <FormControl>
                <TextField id="password" name="password" label="Password" />
            </FormControl>
        </form>
    );
};

export default Signin;
