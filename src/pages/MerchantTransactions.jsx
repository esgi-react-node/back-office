import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {useAuthenticatedRequest} from "../hooks/request";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: "20px"
    }
}));

const MerchantTransactions = () => {
    const {id} = useParams();
    const styles = useStyles();
    const {getRequest} = useAuthenticatedRequest();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        getRequest(`merchants/${id}/transactions`).then((json) => {
            setTransactions(json); 
        }).catch(() => {
            setSnackbarMessage("Failed to retrieve merchants transactions");
            setSnackbarOpen(true);
        });
    }, []);

    if (!transactions) {
        return (
            <Container>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "left", }}
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage} />

                <Grid justify="center" className={styles.grid} container>
                    <Typography variant="h3">Merchant #{id} Transactions</Typography>
                    <Typography variant="p">Loading...</Typography>
                </Grid>
            </Container>
        );
    }

    return (
        <Container>
            <Grid justify="center" className={styles.grid} container>
                <Grid xs={12} justify="center" container item>
                    <Typography variant="h3">Merchant #{id} Transactions</Typography>
                </Grid>

                <Grid xs={12} item>
                    <Typography>{JSON.stringify(transactions)}</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MerchantTransactions;
