import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {useAuthenticatedRequest} from "../hooks/request";

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: "20px"
    }
}));

const Transactions= () => {
    const styles = useStyles();
    const [transactions, setTransactions] = useState([]);
    const {getRequest} = useAuthenticatedRequest();

    useEffect(() => {
        getRequest("transactions").then(json => {
            console.log("Fetched transactions");
            console.log(json);
            setTransactions(json);
        }).catch(error => {
            console.error("Failed to fetch the transactions");
            console.error(error.message);
        });
    }, []);
    
    return (
        <Container>
            <Grid justify="center" className={styles.grid} container>
                <Typography variant="h3">Transactions</Typography>
                {transactions.map((transaction, index) => <p key={`transaction-${index}`}>{JSON.stringify(transaction)}</p>)}
            </Grid>
        </Container>
    );
};

export default Transactions;
