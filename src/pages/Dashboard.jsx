import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {useUserContext} from "../contexts/User";
import {useHistory} from "react-router-dom";

const Dashboard = () => {
    const [statistics, setStatistics] = useState({});
    const {user, setUser} = useUserContext();
    const history = useHistory();

    console.log(statistics);

    useEffect(() => {
        fetch("http://localhost:3000/dashboard", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        }).then(response => {
            if (response.status === 401) {
                setUser({});
                history.push("/signin");
                throw new Error("Disconnected");
            }

            if (!response.ok) {
                throw new Error();
            }

            return response.json();
        }).then(({averageAmountByMerchant, averageTransaction, averageTransactionByMerchant, countMerchant}) => {
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
            </Grid>
        </Container>
    );
};

export default Dashboard;
