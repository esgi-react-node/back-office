import React from "react";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import DashboardPage from "./pages/Dashboard";
import MerchantsPage from "./pages/Merchants";
import MerchantPage from "./pages/Merchant";
import TransactionsPage from "./pages/Transactions";
import Header from "./components/Header";
import Menu from "./components/Menu";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {MenuProvider} from "./contexts/Menu";

const App = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <MenuProvider>
                    <Menu />
                    <Header />
                </MenuProvider>

                <Switch>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/dashboard" component={DashboardPage} exact />
                    <Route path="/merchants" component={MerchantsPage} exact />
                    <Route path="/merchants/:id" component={MerchantPage} exact />
                    <Route path="/transactions" component={TransactionsPage} exact />
                    <Route component={NotFoundPage} />
                </Switch>
            </BrowserRouter>
        </React.StrictMode>
    );
};

export default App;
