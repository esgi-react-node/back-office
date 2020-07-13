import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {useAuthenticatedRequest} from "../hooks/request";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {dateStringToHuman} from "../lib/date";
import {numberToCurrency} from "../lib/number";
import {Link} from "react-router-dom";

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: "20px"
    },
    tableHeadCell: {
        whiteSpace: "nowrap"
    }
}));

const Merchants = () => {
    const [merchants, setMerchants] = useState([]);
    const styles = useStyles();
    const {getRequest} = useAuthenticatedRequest();

    console.log(merchants);

    useEffect(() => {
        getRequest("merchants").then(json => {
            setMerchants(json);
        }).catch(error => {
            console.error("While trying to fetch the list of merchants");
            console.error(error.message);
        });
    }, []);

    return (
        <Container>
            <Grid justify="center" className={styles.grid} container>
                <Typography variant="h3">Merchants</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={styles.tableHeadCell}>Identifier</TableCell>
                                <TableCell className={styles.tableHeadCell}>Name</TableCell>
                                <TableCell className={styles.tableHeadCell}>Currency</TableCell>
                                <TableCell className={styles.tableHeadCell}>Contact Name</TableCell>
                                <TableCell className={styles.tableHeadCell}>Email</TableCell>
                                <TableCell className={styles.tableHeadCell}>Phone Number</TableCell>
                                <TableCell className={styles.tableHeadCell}>Created At</TableCell>
                                <TableCell className={styles.tableHeadCell}>Updated At</TableCell>
                                <TableCell>Credits</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {merchants.map(({id, name, currency, contactName, email, phoneNumber, createdAt, updatedAt, credit}, index) => (
                                <TableRow key={`merchant-${index}`}>
                                    <TableCell><Link to={`/merchant/${id}`}>{id}</Link></TableCell>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{currency}</TableCell>
                                    <TableCell>{contactName}</TableCell>
                                    <TableCell>{email}</TableCell>
                                    <TableCell>{phoneNumber}</TableCell>
                                    <TableCell>{dateStringToHuman(createdAt)}</TableCell>
                                    <TableCell>{dateStringToHuman(updatedAt)}</TableCell>
                                    <TableCell>{numberToCurrency(credit)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Container>
    );
};

export default Merchants;
