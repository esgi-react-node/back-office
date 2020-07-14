import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useFormState} from "../hooks/form";
import {useAuthenticatedRequest} from "../hooks/request";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles(() => ({
    container: {
        marginTop: "20px"
    },
    textField: {
        width: "100%"
    },
    typography: {
        textAlign: "center"
    }
}));

const MerchantNew = () => {
    const styles = useStyles();
    const {postRequest} = useAuthenticatedRequest();
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [name, setFormName] = useFormState("Name"); 
    const [kbisUrl, setKbisUrl] = useFormState("https://google.fr");
    const [currency, setCurrency] = useFormState("EUR");
    const [confirmUrl, setConfirmUrl] = useFormState("https://google.fr");
    const [cancelUrl, setCancelUrl] = useFormState("https://google.fr");
    const [contactName, setContactName] = useFormState("Contact Name");
    const [email, setEmail] = useFormState("contact@name.com");
    const [phoneNumber, setPhoneNumber] = useFormState("0102030405");
    const [address, setAddress] = useFormState("242 rue du faubourg saint antoine");
    const [city, setCity] = useFormState("Paris");
    const [zipCode, setZipCode] = useFormState("75012");
    const [country, setCountry] = useFormState("France");

    const add = () => {
        postRequest("merchants", {
            name,
            KBISUrl: kbisUrl,
            currency,
            confirmUrl,
            cancelUrl,
            contactName,
            email,
            phoneNumber,
            address: {
                fullName: name,
                address,
                town: city,
                zip: zipCode,
                country
            }
        }).then(() => {
            setSnackbarMessage("Successfully added a new merchant");
        }).catch(() => {
            setSnackbarMessage("Failed to add a new merchant");
        }).finally(() => {
            setSnackbarOpen(true);
        });
    };

    return (
        <Container className={styles.container}>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage} />
            <Grid container justify="center" spacing={5}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h3" className={styles.typography}>New Merchant</Typography>
                </Grid>

                <Grid item xs={12} sm={8} md={6} lg={6}>
                    <Grid direction="row" justify="center" container spacing={3}>
                        <Grid xs={12} item>
                            <TextField
                                onInput={setFormName}
                                value={name}
                                className={styles.textField}
                                label="Name"
                                variant="outlined"
                                autoFocus />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={kbisUrl}
                                onInput={setKbisUrl}
                                type="url"
                                className={styles.textField}
                                label="KBis URL"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={currency}
                                onInput={setCurrency}
                                className={styles.textField}
                                label="Currency"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={confirmUrl}
                                onInput={setConfirmUrl}
                                type="url"
                                className={styles.textField}
                                label="Confirm URL"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={cancelUrl}
                                onInput={setCancelUrl}
                                type="url"
                                className={styles.textField}
                                label="Cancel URL"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={contactName}
                                onInput={setContactName}
                                className={styles.textField}
                                label="Contact Name"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={email}
                                onInput={setEmail}
                                type="email"
                                className={styles.textField}
                                label="Email"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={phoneNumber}
                                onInput={setPhoneNumber}
                                type="phone"
                                className={styles.textField}
                                label="Phone Number"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={address}
                                onInput={setAddress}
                                className={styles.textField}
                                label="Address"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={city}
                                onInput={setCity}
                                className={styles.textField}
                                label="City"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={zipCode}
                                onInput={setZipCode}
                                className={styles.textField}
                                label="Zip Code"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={country}
                                onInput={setCountry}
                                className={styles.textField}
                                label="Country"
                                variant="outlined" />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <Button
                        onClick={add}
                        variant="contained"
                        color="primary"
                        type="button">
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MerchantNew;
