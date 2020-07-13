import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {useAuthenticatedRequest} from "../hooks/request";

const User = () => {
    const {id} = useParams();
    const [fetchedUser, setFetchedUser] = useState(null);
    const {getRequest} = useAuthenticatedRequest();
    
    useEffect(() => {
        getRequest(`users/${id}`).then(json => {
            setFetchedUser(json);
        }).catch(error => {
            console.error(error.message);
        });
    }, []);

    if (!fetchedUser) {
        return (
            <Typography variant="h3">Chargement...</Typography>
        );
    }

    return (
        <h1>User #{id}</h1>
    );
};

export default User;
