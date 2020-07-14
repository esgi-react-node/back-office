import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {useAuthenticatedRequest} from "../hooks/request";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {TabPanel} from "../components/TabPanel";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {numberToCurrency} from "../lib/number";

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: "20px"
    },
    paper: {
        padding: "20px"
    }
}));

const Dashboard = () => {
    const styles = useStyles();
    const [tab, setTab] = useState(0);
    const [statistics, setStatistics] = useState(null);
    const {getRequest} = useAuthenticatedRequest();


    console.log(statistics);

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

    if (statistics) {
        return (
            <Container>
                <Grid className={styles.grid} spacing={5} container>
                    <Grid xs={12} justify="center" item container>
                        <Typography variant="h3">Dashboard</Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <AppBar position="static">
                            <Grid justify="center" container>
                                <Tabs value={tab} onChange={(event, newTab) => setTab(newTab)}>
                                    <Tab label="Average Amount per Merchant" />
                                    <Tab label="Average Transaction" />
                                    <Tab label="Average Transaction by Merchant" />
                                    <Tab label="Merchant Count" />
                                </Tabs>
                            </Grid>
                        </AppBar>
                        <TabPanel value={tab} index={0}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Average Amount</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {statistics.averageAmountByMerchant.map(({_id, avgAmountByMerchant}) => (
                                        <TableRow key={`average-amount-by-merchant-${_id}`}>
                                            <TableCell>{_id}</TableCell>
                                            <TableCell>{numberToCurrency(avgAmountByMerchant)}</TableCell>
                                        </TableRow>
                                    ))} 
                                </TableBody>
                            </Table>
                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Transactions Count</TableCell>
                                        <TableCell>Average Amount</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    <TableRow>
                                        <TableCell>{statistics.averageTransaction[0].countAmount}</TableCell>
                                        <TableCell>{numberToCurrency(statistics.averageTransaction[0].avgAmount)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TabPanel>
                        <TabPanel value={tab} index={2}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Average Amount</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {statistics.averageAmountByMerchant.map(({_id, avgAmountByMerchant}) => (
                                        <TableRow key={`average-amount-${_id}`}>
                                            <TableCell>{_id}</TableCell>
                                            <TableCell>{numberToCurrency(avgAmountByMerchant)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabPanel>
                        <TabPanel value={tab} index={3}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Merchant Count</TableCell>
                                        <TableCell>{statistics.countMerchant[0].countMerchant}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TabPanel>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    return (
        <Container>
            <Grid className={styles.grid} container>
                <Grid xs={12} justify="center" item container>
                    <Typography variant="h3">Welcome</Typography>
                    <Typography>Loading...</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
