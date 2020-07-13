import React from "react";
import NotFoundConnectedPage from "./pages/NotFoundConnected";
import NotFoundDisconnectedPage from "./pages/NotFoundDisconnected";
import DashboardPage from "./pages/Dashboard";
import MerchantNewPage from "./pages/MerchantNew";
import MerchantsPage from "./pages/Merchants";
import AccountPage from "./pages/Account";
import TransactionsPage from "./pages/Transactions";
import SigninPage from "./pages/Signin";
import SignupPage from "./pages/Signup";
import Header from "./components/Header";
import Menu from "./components/Menu";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {MenuProvider} from "./contexts/Menu";
import {UserProvider, useUserContext} from "./contexts/User";
import UsersPage from "./pages/Users";
import UserPage from "./pages/User";
import MerchantPage from "./pages/Merchant";

const RouteList = ({routes}) => routes.map(({path, component}, index) => (
    <Route key={`route-${index}`} path={path} component={component} exact />)
);

const Routes = () => {
    const {user} = useUserContext();

    const connectedRoutes = [
        { path: "/account", component: AccountPage },
        { path: "/dashboard", component: DashboardPage },
        { path: "/merchants", component: MerchantsPage },
        { path: "/merchant/new", component: MerchantNewPage },
        { path: "/merchant/:id", component: MerchantPage },
        { path: "/transactions", component: TransactionsPage },
        { path: "/users", component: UsersPage },
        { path: "/user/:id", component: UserPage },
    ];

    if (user.token) {
        return <Switch>
            <RouteList routes={connectedRoutes} />
            <Route component={NotFoundConnectedPage} />
        </Switch>;
    }

    const disconnectedRoutes = [
        { path: "/signin", component: SigninPage },
        { path: "/signup", component: SignupPage },
    ];

    return <Switch>
        <RouteList routes={disconnectedRoutes} />
        <Route component={NotFoundDisconnectedPage} />
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
