import {useCallback} from "react";
import {useUserContext} from "../contexts/User";
import {useHistory} from "react-router-dom";

const URL = "http://localhost:3000";

export const useAuthenticatedRequest = () => {
    const history = useHistory();
    const {user, setUser} = useUserContext();

    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${user.token}`
    };
    
    const URL = "http://localhost:3000";

    const responseHandler = useCallback(response => {
        if (response.status === 401) {
            setUser({});
            history.push("/signin");
            throw new Error("Disconnected");
        }

        if (!response.ok) {
            throw new Error("Failed to fetch");
        }

        return response.json();
    });

    return {
        getRequest(endpoint) {
            return fetch(`${URL}/${endpoint}`, {headers}).then(responseHandler);
        },
        postRequest(endpoint, data) {
            return fetch(`${URL}/${endpoint}`, {headers, method: "POST", body: JSON.stringify(data)}).then(responseHandler);
        },
        putRequest(endpoint, data) {
            return fetch(`${URL}/${endpoint}`, {headers, method: "PUT", body: JSON.stringify(data)}).then(responseHandler);
        },
        deleteRequest(endpoint) {
            return fetch(`${URL}/${endpoint}`, {headers, method: "DELETE"}).then(responseHandler);
        }
    }; 
};

export const useRequest = () => {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    };
    

    const responseHandler = useCallback(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch");
        }

        return response.json();
    });

    return {
        getRequest(endpoint) {
            return fetch(`${URL}/${endpoint}`, {headers}).then(responseHandler);
        },
        postRequest(endpoint, data) {
            return fetch(`${URL}/${endpoint}`, {headers, method: "POST", body: JSON.stringify(data)}).then(responseHandler);
        },
        putRequest(endpoint, data) {
            return fetch(`${URL}/${endpoint}`, {headers, method: "PUT", body: JSON.stringify(data)}).then(responseHandler);
        },
        deleteRequest(endpoint) {
            return fetch(`${URL}/${endpoint}`, {headers, method: "DELETE"}).then(responseHandler);
        }
    }; 
};
