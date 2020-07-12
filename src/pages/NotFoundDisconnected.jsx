import React from "react";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: "40px"
    },
    link: {
        marginTop: "20px"
    }
}));

const NotFoundDisconnected = () => {
    const styles = useStyles();

    return (
        <Container>
            <Grid
                alignItems="center"
                justify="center"
                direction="column"
                className={styles.grid}
                container>
                <Typography variant="h3">404 — Page not found</Typography>
                <Link to="/signin" className={styles.link}>
                    <Button variant="contained" color="primary">Signin</Button>
                </Link>
            </Grid>
        </Container>
    );
};

export default NotFoundDisconnected;
