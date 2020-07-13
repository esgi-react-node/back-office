import React, {useState} from "react";
import {useParams} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {useAuthenticatedRequest} from "../hooks/request";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {useFormState} from "../hooks/form";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: "20px"
    },
    textField: {
        width: "100%"
    }
}));

const Merchant = () => {
    const styles = useStyles();
    const {id} = useParams();
    const {postRequest} = useAuthenticatedRequest();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [name, setFormName] = useFormState("");
    const [kbisUrl, setFormKbisUrl] = useFormState("");
    const [currency, setFormCurrency] = useFormState("");
    const [contactName, setFormContactName] = useFormState("");
    const [email, setFormEmail] = useFormState("");
    const [phoneNumber, setFormPhoneNumber] = useFormState("");

    const update = () => {
        postRequest(`merchants/${id}`, {
            name,
            KBISUrl: kbisUrl,
            currency,
            contactName,
            email,
            phoneNumber
        }).then(() => {
            setSnackbarMessage("Successfully updated the merchant details");
            setSnackbarOpen(true);
        }).catch(() => {
            setSnackbarMessage("Failed to update the merchant details");
            setSnackbarOpen(true);
        });
    };

    return (
        <Container>

            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage} />

            <Grid justify="center" className={styles.grid} spacing={3} container>
                <Grid xs={12} sm={8} lg={6} xl={6} justify="center" spacing={3} item container>
                    <Typography variant="h3">New Merchant</Typography>

                    <Grid xs={12} item>
                        <TextField
                            className={styles.textField}
                            variant="outlined"
                            label="Name"
                            value={name}
                            onInput={setFormName} />
                    </Grid>

                    <Grid xs={12} item>
                        <TextField
                            className={styles.textField}
                            variant="outlined"
                            label="KBis URL"
                            value={kbisUrl}
                            onInput={setFormKbisUrl} />
                    </Grid>

                    <Grid xs={12} item>
                        <TextField
                            className={styles.textField}
                            variant="outlined"
                            label="Currency"
                            value={currency}
                            onInput={setFormCurrency} />
                    </Grid>

                    <Grid xs={12} item>
                        <TextField
                            className={styles.textField}
                            variant="outlined"
                            label="Contact Name"
                            value={contactName}
                            onInput={setFormContactName} />
                    </Grid>

                    <Grid xs={12} item>
                        <TextField
                            className={styles.textField}
                            variant="outlined"
                            label="Email"
                            value={email}
                            onInput={setFormEmail} />
                    </Grid>

                    <Grid xs={12} item>
                        <TextField
                            className={styles.textField}
                            variant="outlined"
                            label="Phone Number"
                            value={phoneNumber}
                            onInput={setFormPhoneNumber} />
                    </Grid>

                    <Button variant="contained" color="primary" onClick={update}>Update</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Merchant;
