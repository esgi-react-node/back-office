import React, {useEffect, useState, useCallback} from "react";
import {useParams, Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {useAuthenticatedRequest} from "../hooks/request";
import {useNotificationContext} from "../contexts/Notification";
import {useFormState} from "../hooks/form";
import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {dateStringToHuman} from "../lib/date";
import {numberToCurrency, numberToDecimal} from "../lib/number";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
    title: {
        marginTop: "20px;"
    }
}));

const Transaction = () => {
    const styles = useStyles();
    const {id} = useParams();
    const {getRequest, postRequest} = useAuthenticatedRequest();
    const {setSuccessNotification, setErrorNotification} = useNotificationContext();
    const [transaction, setTransaction] = useState(null);
    const [refundAmount, setRefundAmount] = useFormState(0);

    const refund = useCallback(() => {
        const amountToRefund = (parseFloat(refundAmount * 100) || 0);
        const previousRefund = (parseFloat(transaction.refund) || 0);

        if ((amountToRefund + previousRefund) > transaction.amount) {
            setErrorNotification("Cannot refund more than the amount");
            return;
        }

        postRequest(`transactions/${id}/refund`, {
            amount: amountToRefund
        }).then((json) => {
            console.log(json);
            setSuccessNotification("Successfully refunded the transaction");
        }).catch(() => {
            setErrorNotification("Failed to refund the transaction");
        });
    });

    const totalRefund = useCallback(() => {
        if (transaction.refund >= transaction.amount) {
            setErrorNotification("Nothing to refund");
            return;
        }

        postRequest(`transactions/${id}/refund`, {
            amount: transaction.amount - transaction.refund
        }).then((json) => {
            console.log(json);
            setSuccessNotification("Successfully refunded the total transaction");
        }).catch(() => {
            setErrorNotification("Failed to refund the total transaction");
        });
    });

    useEffect(() => {
        getRequest(`transactions/${id}`).then((json) => {
            setTransaction(json);
        }).catch(() => {
            setErrorNotification("Failed to fetch transaction details");
        }); 
    }, []);

    if (transaction) {
        return (
            <Container>
                <Grid justify="center" container>
                    <Typography variant="h3" className={styles.title}>Transaction #{id}</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Identifier</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Order</TableCell>
                                    <TableCell>Tag</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Updated At</TableCell>
                                    <TableCell>Deleted At</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow>
                                    <TableCell>{transaction.id}</TableCell>
                                    <TableCell>{numberToCurrency((transaction.amount - (transaction.refund ?? 0)) / 100)}</TableCell>
                                    <TableCell>{transaction.customerId}</TableCell>
                                    <TableCell>{transaction.orderId}</TableCell>
                                    <TableCell>{transaction.tag}</TableCell>
                                    <TableCell>{transaction.status}</TableCell>
                                    <TableCell>{dateStringToHuman(transaction.createdAt)}</TableCell>
                                    <TableCell>{dateStringToHuman(transaction.updatedAt)}</TableCell>
                                    <TableCell>{dateStringToHuman(transaction.deletedAt)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h3" className={styles.title}>Cart</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Identifier</TableCell>
                                    <TableCell>Label</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {transaction.cart.map(({id, label, price, quantity}) => (
                                    <TableRow key={`cart-${id}`}>
                                        <TableCell>{id}</TableCell>
                                        <TableCell>{label}</TableCell>
                                        <TableCell>{numberToCurrency(price / 100)}</TableCell>
                                        <TableCell>{numberToDecimal(quantity)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h3" className={styles.title}>Billing Address</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Identifier</TableCell>
                                    <TableCell>Merchant</TableCell>
                                    <TableCell>Full Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Town</TableCell>
                                    <TableCell>Zip Code</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Updated At</TableCell>
                                    <TableCell>DeletedAt At</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow>
                                    <TableCell>{transaction.billing.id}</TableCell>
                                    <TableCell><Link to={`/merchant/${transaction.billing.MerchantId}`}>{transaction.billing.MerchantId}</Link></TableCell>
                                    <TableCell>{transaction.billing.fullName}</TableCell>
                                    <TableCell>{transaction.billing.address}</TableCell>
                                    <TableCell>{transaction.billing.town}</TableCell>
                                    <TableCell>{transaction.billing.zip}</TableCell>
                                    <TableCell>{transaction.billing.country}</TableCell>
                                    <TableCell>{dateStringToHuman(transaction.billing.createdAt)}</TableCell>
                                    <TableCell>{dateStringToHuman(transaction.billing.updatedAt)}</TableCell>
                                    <TableCell>{dateStringToHuman(transaction.billing.deletedAt)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h3" className={styles.title}>Shipping Address</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Identifier</TableCell>
                                    <TableCell>Merchant</TableCell>
                                    <TableCell>Full Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Town</TableCell>
                                    <TableCell>Zip Code</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Updated At</TableCell>
                                    <TableCell>DeletedAt At</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow>
                                    <TableCell>{transaction.shipping.id}</TableCell>
                                    <TableCell><Link to={`/merchant/${transaction.shipping.MerchantId}`}>{transaction.shipping.MerchantId}</Link></TableCell>
                                    <TableCell>{transaction.shipping.fullName}</TableCell>
                                    <TableCell>{transaction.shipping.address}</TableCell>
                                    <TableCell>{transaction.shipping.town}</TableCell>
                                    <TableCell>{transaction.shipping.zip}</TableCell>
                                    <TableCell>{transaction.shipping.country}</TableCell>
                                    <TableCell>{dateStringToHuman(transaction.shipping.createdAt)}</TableCell>
                                    <TableCell>{dateStringToHuman(transaction.shipping.updatedAt)}</TableCell>
                                    <TableCell>{dateStringToHuman(transaction.shipping.deletedAt)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h3" className={styles.title}>Refund</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><TextField label="Refund Amount" onInput={setRefundAmount} value={refundAmount} type="number" /></TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={refund}>Refund</Button>
                                        <Button variant="contained" color="primary" onClick={totalRefund}>Total Refund</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h3">Transaction #{id}</Typography>
            <p>{JSON.stringify(transaction)}</p>
        </Container>
    );
};

export default Transaction;
