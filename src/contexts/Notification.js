import PropTypes from "prop-types";
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import {useState, useCallback, createContext, useContext, useReducer} from "react";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => (
    <MuiAlert elevation={6} variant="filled" {...props} />
);

const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
    const reducer = (state, action) => {
        switch (action.type) {
        case "SUCCESS":
            return {
                message: action.payload,
                type: "success" 
            };

        case "ERROR":
            return {
                message: action.payload,
                type: "error" 
            };

        default:
            return {
                message: action.payload,
                type: "info" 
            };
        }
    };

    const initialState = {message: "", type: "success"}; // error, warning, info, success
    const [notification, dispatch] = useReducer(reducer, initialState);
    const [open, setOpen] = useState(false);

    const setSuccessNotification = useCallback((payload) => {
        setOpen(true);
        dispatch({type: "SUCCESS", payload});
    });

    const setErrorNotification = useCallback((payload) => {
        setOpen(true);
        dispatch({type: "ERROR", payload});
    });

    const handleClose = useCallback(() => {
        setOpen(false);
    });

    return (
        <NotificationContext.Provider value={{setSuccessNotification, setErrorNotification}}>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left", }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity={notification.type}>{notification.message}</Alert>
            </Snackbar>
            {children}
        </NotificationContext.Provider>
    );
};

NotificationProvider.propTypes = {
    children: PropTypes.element
};

export const useNotificationContext = () => useContext(NotificationContext);
