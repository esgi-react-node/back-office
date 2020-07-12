import React from "react";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import DashboardPage from "./pages/Dashboard";
import MerchantsPage from "./pages/Merchants";
import MerchantPage from "./pages/Merchant";
import TransactionsPage from "./pages/Transactions";
import SigninPage from "./pages/Signin";
import SignupPage from "./pages/Signup";
import Header from "./components/Header";
import Menu from "./components/Menu";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {MenuProvider} from "./contexts/Menu";

const App = () => {
    const userConnected = false;

    return (
        <React.StrictMode>
            <BrowserRouter>
                <MenuProvider>
                    <Menu />
                    <Header />
                </MenuProvider>

                <Switch>
                    {userConnected ? (
                        <>
                            <Route path="/" component={HomePage} exact />
                            <Route path="/dashboard" component={DashboardPage} exact />
                            <Route path="/merchants" component={MerchantsPage} exact />
                            <Route path="/merchants/:id" component={MerchantPage} exact />
                            <Route path="/transactions" component={TransactionsPage} exact />
                            <Route component={NotFoundPage} />
                        </>
                    ) : (
                        <>
                            <Route path="/signin" component={SigninPage} exact />
                            <Route path="/signup" component={SignupPage} exact />
                            <Redirect to="/signin" />
                        </>
                    )}
                </Switch>
            </BrowserRouter>
        </React.StrictMode>
    );
};

export default App;
