import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {useAuthenticatedRequest} from "../hooks/request";
import {useNotificationContext} from "../contexts/Notification";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {numberToCurrency} from "../lib/number";
import {dateStringToHuman} from "../lib/date";

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: "20px"
    }
}));

const MerchantTransactions = () => {
    const {setErrorNotification} = useNotificationContext();
    const {id} = useParams();
    const styles = useStyles();
    const {getRequest} = useAuthenticatedRequest();
    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        getRequest(`merchants/${id}/transactions`).then((json) => {
            setTransactions(json); 
        }).catch(() => {
            setErrorNotification("Failed to retrieve merchants transactions");
        });
    }, []);

    if (!transactions) {
        return (
            <Container>
                <Grid justify="center" className={styles.grid} container>
                    <Typography variant="h3">Merchant #{id} Transactions</Typography>
                    <Typography>Loading...</Typography>
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
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Identifier</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Updated At</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {transactions.map(({id, customerId, amount, status, createdAt, updatedAt}, index) => (
                                    <TableRow key={`transaction-${index}`}>
                                        <TableCell><Link to={`/transaction/${id}`}>{id}</Link></TableCell>
                                        <TableCell>{customerId}</TableCell>
                                        <TableCell>{numberToCurrency(amount)}</TableCell>
                                        <TableCell>{status}</TableCell>
                                        <TableCell>{dateStringToHuman(createdAt)}</TableCell>
                                        <TableCell>{dateStringToHuman(updatedAt)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MerchantTransactions;
