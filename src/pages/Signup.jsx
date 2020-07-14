import React, {useCallback} from "react";
import {useHistory} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {useFormState, useFormError} from "../hooks/form";
import {useFocusRef} from "../hooks/element";
import {isValidEmail} from "../lib/email";
import {isValidPassword} from "../lib/password";
import Typography from "@material-ui/core/Typography";
import {useNotificationContext} from "../contexts/Notification";

const useStyles = makeStyles(() => ({
    container: {
        marginTop: "20px"
    },
    textField: {
        width: "100%"
    },
    title: {
        textAlign: "center"
    }
}));

const Signup = () => {
    const {setSuccessNotification, setErrorNotification} = useNotificationContext();
    const styles = useStyles();
    const [email, setFormEmail] = useFormState("");
    const [password, setFormPassword] = useFormState("");
    const [passwordConfirmation, setFormPasswordConfirmation] = useFormState("");
    const [hasEmailError, emailError] = useFormError(isValidEmail, "Email is invalid", email);
    const [hasPasswordError, passwordError] = useFormError(isValidPassword, "Eight characters, lower, uppper, digits & symbols", password);
    const [hasPasswordConfirmationError, passwordConfirmationError] = useFormError(() => password === passwordConfirmation, "Passwords do not match", password, passwordConfirmation);
    const history = useHistory();
    const emailRef = useFocusRef();

    const signup = useCallback(() => {
        const method = "POST";
        const contentType = {"Content-Type": "application/json"};
        const accept = {"Accept": "application/json"};
        const headers = {...contentType, ...accept};
        const body = JSON.stringify({ username: email, password, role: "admin" });
        const options = {method, headers, body};

        fetch("http://localhost:3000/users", options).then(response => {
            if (!response.ok) {
                throw new Error("Unable to reach the API");
            }

            return response.json();
        }).then(() => {
            setSuccessNotification("Successfully created your account");
            history.push("/signin");
        }).catch(() => {
            setErrorNotification("An account already exists for this email");
        });
    });

    return (
        <Container className={styles.container}>
            <Grid container justify="center" spacing={5}>
                <Grid xs={12} item>
                    <Typography variant="h3" className={styles.title}>Signup</Typography>
                </Grid>

                <Grid item xs={12} sm={8} md={6} lg={6}>
                    <Grid direction="row" justify="center" container spacing={3}>
                        <Grid xs={12} item>
                            <TextField
                                type="email"
                                inputRef={emailRef}
                                className={styles.textField}
                                label="Email*" variant="outlined"
                                onInput={setFormEmail}
                                error={hasEmailError}
                                helperText={emailError} 
                                autoFocus />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                type="password"
                                className={styles.textField}
                                label="Password*"
                                variant="outlined"
                                onInput={setFormPassword}
                                error={hasPasswordError}
                                helperText={passwordError} />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                type="password"
                                className={styles.textField}
                                label="Password Confirmation*"
                                variant="outlined"
                                onInput={setFormPasswordConfirmation}
                                error={hasPasswordConfirmationError}
                                helperText={passwordConfirmationError} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={signup}
                        disabled={hasEmailError || hasPasswordError || hasPasswordConfirmationError}>
                        Signin
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Signup;
