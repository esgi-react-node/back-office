import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: "20px"
    }
}));

const Account = () => {
    const styles = useStyles();

    return (
        <Container>
            <Grid justify="center" className={styles.grid} container>
                <Typography variant="h3">Account</Typography>
            </Grid>
        </Container>
    );
};

export default Account;
