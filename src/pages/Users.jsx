import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import {dateStringToHuman} from "../lib/date";
import EditIcon from "@material-ui/icons/Edit";
import {Link} from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {useAuthenticatedRequest} from "../hooks/request";

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: "20px"
    }
}));

const UsersView = ({users}) => {
    return users.map(User);
};

const User = ({id, username, firstname, lastname, role, createdAt, updatedAt, deletedAt}, index) => {
    return (
        <TableRow key={`user-${index}`}>
            <TableCell>{id ?? "Unknown"}</TableCell>
            <TableCell>{username ?? "Unknown"}</TableCell>
            <TableCell>{firstname ?? "Unknown"}</TableCell>
            <TableCell>{lastname ?? "Unknown"}</TableCell>
            <TableCell>{role ?? "Unknown"}</TableCell>
            <TableCell>{dateStringToHuman(createdAt)}</TableCell>
            <TableCell>{dateStringToHuman(updatedAt)}</TableCell>
            <TableCell>{dateStringToHuman(deletedAt)}</TableCell>
            <TableCell><Link to={`/user/${id}`}><EditIcon color="primary" /></Link><DeleteForeverIcon color="primary" /></TableCell>
        </TableRow>
    );
};

User.propTypes = {
    id: PropTypes.number,
    username: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    role: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    updatedAt: PropTypes.instanceOf(Date),
    deletedAt: PropTypes.instanceOf(Date)
};

const Users = () => {
    const styles = useStyles();
    const [users, setUsers] = useState([]);
    const {getRequest} = useAuthenticatedRequest();

    useEffect(() => {
        getRequest("users").then(json => {
            setUsers(json);
        }).catch(error => {
            console.error(error.message);
        });
    }, []);

    return (
        <Container>
            <Grid justify="center" className={styles.grid} container>
                <Typography variant="h3">Users</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell component="th">Identifier</TableCell>
                                <TableCell>UserName</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Updated At</TableCell>
                                <TableCell>Deleted At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <UsersView users={users} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Container>
    );
};

export default Users;
