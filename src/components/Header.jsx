import React from "react";
import {makeStyles} from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {useMenuContext} from "../contexts/Menu";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 2,
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = () => {
    const classes = useStyles();
    const {setMenuOpen} = useMenuContext();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setMenuOpen(true)}>
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>Back-Office</Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
