import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {useAuthenticatedRequest} from "../hooks/request";

const Dashboard = () => {
    const [statistics, setStatistics] = useState({});
    const {getRequest} = useAuthenticatedRequest();

    useEffect(() => {
        getRequest("dashboard").then(({averageAmountByMerchant, averageTransaction, averageTransactionByMerchant, countMerchant}) => {
            setStatistics({
                averageAmountByMerchant,
                averageTransaction,
                averageTransactionByMerchant,
                countMerchant
            });
        }).catch(error => {
            console.error("An error occured while fetching dashboard's statistics");
            console.error(error.message);
        });
    }, []);

    return (
        <Container>
            <Grid alignItems="center" direction="column" container>
                <Typography variant="h3">Dashboard</Typography>
                <p>{JSON.stringify(statistics)}</p>
            </Grid>
        </Container>
    );
};

export default Dashboard;
