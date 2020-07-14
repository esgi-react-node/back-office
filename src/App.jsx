import React from "react";
import DashboardPage from "./pages/Dashboard";
import MerchantNewPage from "./pages/MerchantNew";
import MerchantsPage from "./pages/Merchants";
import TransactionsPage from "./pages/Transactions";
import SigninPage from "./pages/Signin";
import SignupPage from "./pages/Signup";
import Header from "./components/Header";
import Menu from "./components/Menu";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {MenuProvider} from "./contexts/Menu";
import {UserProvider, useUserContext} from "./contexts/User";
import UsersPage from "./pages/Users";
import MerchantPage from "./pages/Merchant";
import UserPage from "./pages/User";
import MerchantTransactionsPage from "./pages/MerchantTransactions";
import {NotificationProvider} from "./contexts/Notification";
import TransactionPage from "./pages/Transaction";
import NotFoundConnectedPage from "./pages/NotFoundConnected";
import NotFoundDisconnectedPage from "./pages/NotFoundDisconnected";
import InformationPage from "./pages/Information";

const Routes = () => {
    const {user} = useUserContext();

    if (user.token) {
        return <Switch>
            <Route path="/dashboard" component={DashboardPage} exact />
            <Route path="/merchants" component={MerchantsPage} exact />
            <Route path="/merchant/new" component={MerchantNewPage} exact />
            <Route path="/merchant/:id" component={MerchantPage} exact />
            <Route path="/merchant/:id/transactions" component={MerchantTransactionsPage} exact />
            <Route path="/transactions" component={TransactionsPage} exact />
            <Route path="/transaction/:id" component={TransactionPage} exact />
            <Route path="/users" component={UsersPage} exact />
            <Route path="/user/:id" component={UserPage} exact />
            <Route path="/information" component={InformationPage} exact />
            <Route component={NotFoundConnectedPage} />
        </Switch>;
    }

    return <Switch>
        <Route path="/signin" component={SigninPage} exact />
        <Route path="/signup" component={SignupPage} exact />
        <Route component={NotFoundDisconnectedPage} />
    </Switch>;
};

const App = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <UserProvider>
                    <MenuProvider>
                        <Menu />
                        <Header />
                    </MenuProvider>

                    <NotificationProvider>
                        <Routes />
                    </NotificationProvider>
                </UserProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
};

export default App;
