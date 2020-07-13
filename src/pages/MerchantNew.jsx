import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useFormState} from "../hooks/form";

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
    const [name, setFormName] = useFormState(""); 

    // TODO: useFormState

    return (
        <Container className={styles.container}>
            <Grid container justify="center" spacing={5}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h3" className={styles.typography}>New Merchant</Typography>
                    <p>{name}</p>
                </Grid>

                <Grid item xs={12} sm={8} md={6} lg={6}>
                    <Grid direction="row" justify="center" container spacing={3}>
                        <Grid xs={12} item>
                            <TextField
                                onInput={setFormName}
                                className={styles.textField}
                                label="Name"
                                variant="outlined"
                                autoFocus />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                type="url"
                                className={styles.textField}
                                label="KBis URL"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                className={styles.textField}
                                label="Currency"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                type="url"
                                className={styles.textField}
                                label="Confirm URL"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                type="url"
                                className={styles.textField}
                                label="Cancel URL"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                className={styles.textField}
                                label="Contact Name"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                type="email"
                                className={styles.textField}
                                label="Email"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                type="phone"
                                className={styles.textField}
                                label="Phone Number"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                className={styles.textField}
                                label="Address"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                className={styles.textField}
                                label="City"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                className={styles.textField}
                                label="Zip Code"
                                variant="outlined" />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                className={styles.textField}
                                label="Country"
                                variant="outlined" />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <Button
                        variant="contained"
                        color="primary"
                        type="button">
                        Signin
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MerchantNew;
