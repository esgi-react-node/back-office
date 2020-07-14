import React, {useEffect, useState, useCallback} from "react";
import {useParams} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {useAuthenticatedRequest} from "../hooks/request";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import TableHead from "@material-ui/core/TableHead";
import {useNotificationContext} from "../contexts/Notification";

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: "20px"
    }
}));

const Merchant = () => {
    const {setErrorNotification, setSuccessNotification} = useNotificationContext();
    const {id} = useParams();
    const {getRequest, putRequest, deleteRequest} = useAuthenticatedRequest();
    const styles = useStyles();
    const [merchant, setMerchant] = useState(null);

    useEffect(() => {
        getRequest(`merchants/${id}`).then(json => {
            setMerchant(json);
        }).catch(() => {
            setErrorNotification("Failed to retrieve details for the merchant");
        });
    }, []);

    const validate = useCallback(() => {
        putRequest(`merchants/${id}/validate`).then((json) => {
            setMerchant(json);
            setSuccessNotification("Successfully validated the merchant");
        }).catch(() => {
            setErrorNotification("Failed to validate the merchant");
        }); 
    });

    const revoke = useCallback(() => {
        deleteRequest(`merchants/${id}/credentials`).then((json) => {
            setMerchant(json);
            setSuccessNotification("Successfully revoked credentials");
        }).catch(() => {
            setErrorNotification("Failed to revoke credentials");
        });
    });

    const regenerate = useCallback(() => {
        getRequest(`merchants/${id}/credentials`).then((json) => {
            setMerchant(json);
            setSuccessNotification("Successfully regenerated credentials");
        }).catch(() => {
            setErrorNotification("Failed to regenerate the credentials");
        });
    });

    if (!merchant) {
        return (
            <Container>
                <Typography variant="h3">Merchant #{id}</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Grid justify="center" className={styles.grid} container>
                <Typography variant="h3">
                    <span>Merchant #{id} </span>
                    <span>&nbsp;</span>
                    <Link to={`/merchant/${id}/transactions`}>
                        <Button variant="contained" color="primary">Transactions</Button>
                    </Link>
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Designation</TableCell>
                                <TableCell>Value</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow>
                                <TableCell>Identifier</TableCell>
                                <TableCell>{merchant.id}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{merchant.name}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>KBis URL</TableCell>
                                <TableCell>{merchant.KBISUrl}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Currency</TableCell>
                                <TableCell>{merchant.currency}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Contact Name</TableCell>
                                <TableCell>{merchant.contactName}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>{merchant.email}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>{merchant.phoneNumber}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Confirm URL</TableCell>
                                <TableCell>{merchant.confirmUrl}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Cancel URL</TableCell>
                                <TableCell>{merchant.cancelUrl}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Status</TableCell>
                                <TableCell>{merchant.status}</TableCell>
                                <TableCell>
                                    {(merchant.status !== "validated" || !merchant.token || !merchant.secret) && <Button variant="contained" color="primary" onClick={validate}>Validate</Button>}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Credits</TableCell>
                                <TableCell>{merchant.credit}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Token</TableCell>
                                <TableCell>{merchant.token}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={revoke}>Revoke</Button>
                                    <span>&nbsp;</span>
                                    <Button variant="contained" color="primary" onClick={regenerate}>Regenerate</Button>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Secret</TableCell>
                                <TableCell>{merchant.secret}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={revoke}>Revoke</Button>
                                    <span>&nbsp;</span>
                                    <Button variant="contained" color="primary" onClick={regenerate}>Regenerate</Button>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Created At</TableCell>
                                <TableCell>{merchant.createdAt}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Updated At</TableCell>
                                <TableCell>{merchant.updatedAt}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <Link to={`/user/${id}`}>
                                        <Button color="primary" variant="contained">See</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Container>
    );
};

export default Merchant;
