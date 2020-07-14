import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {useAuthenticatedRequest} from "../hooks/request";
import {useNotificationContext} from "../contexts/Notification";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {numberToCurrency} from "../lib/number";
import {dateStringToHuman} from "../lib/date";
import TextField from "@material-ui/core/TextField";
import {useFormState} from "../hooks/form";

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: "20px"
    },
    table: {
        marginTop: "20px"
    }
}));

const Transactions = () => {
    const {setNotification} = useNotificationContext();
    const styles = useStyles();
    const [transactions, setTransactions] = useState(null);
    const {getRequest} = useAuthenticatedRequest();
    const [search, setSearch] = useFormState("");

    useEffect(() => {
        if (search.trim().length === 0) {
            getRequest("transactions").then(json => {
                setTransactions(json);
            }).catch(() => {
                setNotification("Failed to fetch the transactions");
            });

            return;
        }

        const amountToSearch = (parseFloat(search) || 0) * 100;

        getRequest(`transactions/search?amount=${amountToSearch}`).then(json => {
            setTransactions(json);
        }).catch(() => {
            setNotification("Failed to fetch the transactions");
        });
    }, [search]);

    if (transactions) {
        return (
            <Container>
                <Grid justify="center" className={styles.grid} container>
                    <Grid xs={12} justify="center" container item>
                        <Typography variant="h3">Transactions</Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField
                            type="number"
                            label="Search"
                            onInput={setSearch}
                            value={search} />
                    </Grid>
                    <TableContainer className={styles.table} component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Identifier</TableCell>
                                    <TableCell>Merchant</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Order</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Updated At</TableCell>
                                    <TableCell>Deleted At</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {transactions.map(({id, MerchantId, amount, customerId, orderId, status, createdAt, updatedAt, deletedAt}) => (
                                    <TableRow key={`transaction-${id}`}>
                                        <TableCell><Link to={`/transaction/${id}`}>{id}</Link></TableCell>
                                        <TableCell><Link to={`/merchant/${MerchantId}`}>{MerchantId}</Link></TableCell>
                                        <TableCell>{numberToCurrency(amount / 100)}</TableCell>
                                        <TableCell>{customerId}</TableCell>
                                        <TableCell>{orderId}</TableCell>
                                        <TableCell>{status}</TableCell>
                                        <TableCell>{dateStringToHuman(createdAt)}</TableCell>
                                        <TableCell>{dateStringToHuman(updatedAt)}</TableCell>
                                        <TableCell>{dateStringToHuman(deletedAt)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Container>
        );
    }


    return (
        <Container>
            <Grid justify="center" className={styles.grid} container>
                <Typography variant="h3">Transactions</Typography>
                <Typography>Loading...</Typography>
            </Grid>
        </Container>
    );
};

export default Transactions;
