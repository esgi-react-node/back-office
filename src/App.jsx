import React from "react";
import HomePage from "./pages/Home";
import NotFoundConnectedPage from "./pages/NotFoundConnected";
import NotFoundDisconnectedPage from "./pages/NotFoundDisconnected";
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

const Routes = () => {
    const {user} = useUserContext();

    if (user.token) {
        return <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/dashboard" component={DashboardPage} exact />
            <Route path="/merchants" component={MerchantsPage} exact />
            <Route path="/merchant/new" component={MerchantNewPage} exact />
            <Route path="/transactions" component={TransactionsPage} exact />
            <Route path="*" component={NotFoundConnectedPage} />
        </Switch>;
    }

    return <Switch>
        <Route path="/signin" component={SigninPage} exact />
        <Route path="/signup" component={SignupPage} exact />
        <Route path="*" component={NotFoundDisconnectedPage} />
    </Switch>;
};

const App = () => {
    return (
        <React.StrictMode>
            <UserProvider>
                <BrowserRouter>
                    <MenuProvider>
                        <Menu />
                        <Header />
                    </MenuProvider>

                    <Routes />
                </BrowserRouter>
            </UserProvider>
        </React.StrictMode>
    );
};

export default App;
