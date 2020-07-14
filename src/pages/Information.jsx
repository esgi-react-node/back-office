import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {useUserContext} from "../contexts/User";
import {dateStringToHuman} from "../lib/date";

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: "20px"
    }
}));

const Information = () => {
    const styles = useStyles();
    const {user} = useUserContext();

    return (
        <Container>
            <Grid justify="center" className={styles.grid} container>
                <Typography variant="h3">Information</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Identifier</TableCell>
                                <TableCell>{user.id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>User Name</TableCell>
                                <TableCell>{user.username}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>{user.firstname || "Unknown"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Last Name</TableCell>
                                <TableCell>{user.lastname || "Unkonwn"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Role</TableCell>
                                <TableCell>{user.role}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Created At</TableCell>
                                <TableCell>{dateStringToHuman(user.createdAt)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Updated At</TableCell>
                                <TableCell>{dateStringToHuman(user.updatedAt)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Deleted At</TableCell>
                                <TableCell>{dateStringToHuman(user.deletedAt)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Container>

    );
};

export default Information;
