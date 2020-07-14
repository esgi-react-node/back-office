import React from "react";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: "20px"
    }
}));

const NotFoundConnected = () => {
    const styles = useStyles();

    return (
        <Container>
            <Grid justify="center" className={styles.grid} container>
                <Grid justify="center" xs={12} item container>
                    <Typography variant="h3">Oops!</Typography>
                </Grid>

                <Grid justify="center" xs={12} item container>
                    <Typography>Looks like this page is not found. <Link to="/dashboard">Return to the Dashboard?</Link></Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default NotFoundConnected;
