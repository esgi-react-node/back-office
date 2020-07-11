import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import {useMenuContext} from "../contexts/Menu";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Equalizer from "@material-ui/icons/Equalizer";
import StorefrontIcon from "@material-ui/icons/Storefront";
import PaymentIcon from "@material-ui/icons/Payment";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const useStyles = makeStyles({
    list: {
        width: 250,

        item: {
            color: "inherit",
            textDecoration: "none"
        }
    }
});

const Menu = () => {
    const {menuOpen, setMenuOpen} = useMenuContext();
    const userConnected = false;
    const classes = useStyles();

    const closeMenu = () => setMenuOpen(false);

    return (
        <div>
            <Drawer anchor="left" open={menuOpen} onClose={closeMenu}>
                <List className={classes.list}>
                    <ListItem>
                        <ListItemText primary="John DOE" />
                    </ListItem>

                    <Divider />

                    {userConnected ? (
                        <>
                            <ListItem button component={Link} to="/" className={classes.list.item} onClick={closeMenu}>
                                <ListItemIcon><HomeIcon /></ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>

                            <ListItem button component={Link} to="/dashboard" className={classes.list.item} onClick={closeMenu}>
                                <ListItemIcon><Equalizer /></ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>

                            <ListItem button component={Link} to="/merchants" className={classes.list.item} onClick={closeMenu}>
                                <ListItemIcon><StorefrontIcon /></ListItemIcon>
                                <ListItemText primary="Merchants" />
                            </ListItem>

                            <ListItem button component={Link} to="/transactions" className={classes.list.item} onClick={closeMenu}>
                                <ListItemIcon><PaymentIcon /></ListItemIcon>
                                <ListItemText primary="Transactions" />
                            </ListItem>
                        </>
                    ) : (
                        <ListItem button component={Link} to="/signin" className={classes.list.item} onClick={closeMenu}>
                            <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                            <ListItemText primary="Signin" />
                        </ListItem>
                    )}
                </List>
            </Drawer>
        </div>
    );
};

export default Menu;
