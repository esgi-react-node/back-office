import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {useMenuContext} from "../contexts/Menu";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Equalizer from "@material-ui/icons/Equalizer";
import StorefrontIcon from "@material-ui/icons/Storefront";
import PaymentIcon from "@material-ui/icons/Payment";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {useUserContext} from "../contexts/User";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    list: {
        width: 250,

        item: {
            color: "inherit",
            textDecoration: "none"
        }
    },

    title: {
        textAlign: "center"
    }
});

const Menu = () => {
    const {menuOpen, setMenuOpen} = useMenuContext();
    const styles = useStyles();
    const {user, setUser} = useUserContext();
    const closeMenu = () => setMenuOpen(false);
    const history = useHistory();

    const disconnect = () => {
        setUser({});
        setMenuOpen(false);
        history.push("/signin");
    };

    return (
        <div>
            <Drawer anchor="left" open={menuOpen} onClose={closeMenu}>
                <List className={styles.list}>
                    <ListItem>
                        <ListItemText className={styles.title} primary="John DOE" />
                    </ListItem>

                    <Divider />

                    {user.token ? (
                        <>
                            <ListItem button component={Link} to="/information" className={styles.list.item} onClick={closeMenu}>
                                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                                <ListItemText primary="Information" />
                            </ListItem>

                            <ListItem button component={Link} to="/dashboard" className={styles.list.item} onClick={closeMenu}>
                                <ListItemIcon><Equalizer /></ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>

                            <ListItem button component={Link} to="/merchants" className={styles.list.item} onClick={closeMenu}>
                                <ListItemIcon><StorefrontIcon /></ListItemIcon>
                                <ListItemText primary="Merchants" />
                            </ListItem>

                            <ListItem button component={Link} to="/transactions" className={styles.list.item} onClick={closeMenu}>
                                <ListItemIcon><PaymentIcon /></ListItemIcon>
                                <ListItemText primary="Transactions" />
                            </ListItem>

                            <Divider />

                            <ListItem button component={Link} to="/users" className={styles.list.item} onClick={closeMenu}>
                                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItem>

                            <Divider />
                            
                            <ListItem button className={styles.list.item} onClick={disconnect}>
                                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                                <ListItemText primary="Déconnexion" />
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem button component={Link} to="/signin" className={styles.list.item} onClick={closeMenu}>
                                <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                                <ListItemText primary="Signin" />
                            </ListItem>

                            <ListItem button component={Link} to="/signup" className={styles.list.item} onClick={closeMenu}>
                                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                                <ListItemText primary="Signup" />
                            </ListItem>
                        </>
                    )}
                </List>
            </Drawer>
        </div>
    );
};

export default Menu;
