import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {useFormInputWithError} from "../hooks/form";

const useStyles = makeStyles(() => ({
    container: {
        marginTop: "20px"
    },
    formControl: {
        marginBottom: "20px",
        width: "100%"
    }
}));

const isValidEmail = email => {
    /* eslint-disable-next-line */
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return pattern.test(email);
};

const isValidPassword = password => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}/.test(password);


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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const setSigninEmail = useFormInputWithError({onValue: setEmail, onError: setEmailError, validator: isValidEmail, error: "Email is invalid"});
    const setSigninPassword = useFormInputWithError({onValue: setPassword, onError: setPasswordError, validator: isValidPassword, error: "Password must contains letter (upper, lower), digits & symbols"});

    return (
        <Container className={styles.container}>
            <Grid container justify="center">
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <FormControl className={styles.formControl}>
                        <TextField label="Email" variant="outlined" onInput={setSigninEmail} helperText={emailError} error={!!emailError} />
                    </FormControl>

                    <FormControl className={styles.formControl}>
                        <TextField type="password" label="Password" variant="outlined" onInput={setSigninPassword} helperText={passwordError} error={!!passwordError} />
                    </FormControl>

                    <Grid container justify="center">
                        <Button variant="contained" color="primary" type="button" onClick={() => signin(email, password)} disabled={(!!emailError || !!passwordError) || !email || !password}>Signin</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Signin;
