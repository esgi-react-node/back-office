import React, {useEffect, useState, useCallback} from "react";
import {useParams, useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {useAuthenticatedRequest} from "../hooks/request";
import {useNotificationContext} from "../contexts/Notification";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {dateStringToHuman} from "../lib/date";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: "20px"
    }
}));

const User = () => {
    const history = useHistory();
    const styles = useStyles();
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const {getRequest, deleteRequest} = useAuthenticatedRequest();
    const {setSuccessNotification, setErrorNotification} = useNotificationContext();

    const remove = useCallback(() => {
        deleteRequest(`users/${id}`).then(() => {
            setSuccessNotification("Successfully deleted the user");
            history.push("/users");
        }).catch(() => {
            setErrorNotification("Failed to delete this user");
        });
    });
    
    useEffect(() => {
        getRequest(`users/${id}`).then(json => {
            setUser(json);
        }).catch(() => {
            setErrorNotification("Failed to fetch user details");
        });
    }, []);

    if (!user) {
        return (
            <Container> 
                <Grid justify="center" spacing={3} className={styles.grid} container>
                    <Typography variant="h3">User #{id}</Typography>
                </Grid>
            </Container> 
        );
    }

    return (
        <Container> 
            <Grid justify="center" spacing={3} className={styles.grid} container>
                <Typography variant="h3">
                    <span>User #{id} </span>
                    <Button variant="contained" color="primary" onClick={remove}>Delete</Button>
                </Typography>
            </Grid>
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
                            <TableCell>{user.firstname}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Last Name</TableCell>
                            <TableCell>{user.lastname}</TableCell>
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
        </Container> 
    );
};

export default User;
