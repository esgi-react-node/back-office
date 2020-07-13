import React, {useState} from "react";
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
import {useUserContext} from "../contexts/User";
import {useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles(() => ({
    container: {
        marginTop: "20px"
    },
    formControl: {
        marginBottom: "20px",
        width: "100%"
    },
    title: {
        textAlign: "center",
        marginBottom: "20px"
    }
}));

const Signin = () => {
    const styles = useStyles();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [email, setEmail] = useFormState("");
    const [password, setPassword] = useFormState("");
    const [hasEmailError, emailError] = useFormError(isValidEmail, "Email is invalid", email);
    const [hasPasswordError, passwordError] = useFormError(isValidPassword, "Eight characters, lower, upper, digits & symbols", password);
    const emailRef = useFocusRef();
    const {setUser} = useUserContext();
    const history = useHistory();

    const signin = (email, password) => {
        setSnackbarOpen(false);

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
            if (!json.token) {
                throw new Error("Bad response from the server");
            }

            setUser({
                token: json.token
            });

            history.push("/dashboard");
        }).catch(() => {
            setSnackbarOpen(true);
        });
    };

    return (
        <Container className={styles.container}>

            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left", }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message="Bad credentials" />

            <Grid container justify="center">
                <Grid xs={12} item>
                    <Typography variant="h3" className={styles.title}>Signin</Typography>
                </Grid>

                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <FormControl className={styles.formControl}>
                        <TextField
                            type="email"
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
