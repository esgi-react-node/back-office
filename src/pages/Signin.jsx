import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {useFormState, useFormError} from "../hooks/form";
import {useFocusRef} from "../hooks/element";
import {isValidEmail} from "../lib/email";
import {isValidPassword} from "../lib/password";

const useStyles = makeStyles(() => ({
    container: {
        marginTop: "20px"
    },
    formControl: {
        marginBottom: "20px",
        width: "100%"
    }
}));

const signin = (email, password) => {
    fetch("http://localhost:3000/login_check", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: email,
            password
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error();
        }

        return response.json();
    }).then(json => {
        console.log(`Response from the API: ${json}`);
    }).catch(error => {
        console.error("An error occurred while trying to login check");
        console.error(error);
    });
};

const Signin = () => {
    const styles = useStyles();
    const [email, setEmail] = useFormState("");
    const [password, setPassword] = useFormState("");
    const [hasEmailError, emailError] = useFormError(isValidEmail, "Email is invalid", email);
    const [hasPasswordError, passwordError] = useFormError(isValidPassword, "Eight characters, lower, upper, digits & symbols", password);

    const emailRef = useFocusRef();

    return (
        <Container className={styles.container}>
            <Grid container justify="center">
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <FormControl className={styles.formControl}>
                        <TextField
                            inputRef={emailRef}
                            label="Email"
                            variant="outlined"
                            onInput={setEmail}
                            helperText={emailError}
                            error={hasEmailError}
                            autoFocus />
                    </FormControl>

                    <FormControl className={styles.formControl}>
                        <TextField
                            type="password"
                            label="Password"
                            variant="outlined"
                            onInput={setPassword}
                            helperText={passwordError}
                            error={hasPasswordError} />
                    </FormControl>

                    <Grid container justify="center">
                        <Button
                            variant="contained"
                            color="primary"
                            type="button"
                            onClick={() => signin(email, password)}
                            disabled={hasPasswordError || hasEmailError}>
                            Signin
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Signin;
