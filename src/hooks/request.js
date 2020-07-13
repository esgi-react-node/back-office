import {useUserContext} from "../contexts/User";
import {useHistory} from "react-router-dom";

export const useAuthenticatedRequest = () => {
    const history = useHistory();
    const {user, setUser} = useUserContext();

    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${user.token}`
    };
    
    const url = "http://localhost:3000";

    const responseHandler = response => {
        if (response.status === 401) {
            setUser({});
            history.push("/signin");
            throw new Error("Disconnected");
        }

        if (!response.ok) {
            throw new Error("Failed to fetch");
        }

        return response.json();
    };

    return {
        getRequest(endpoint) {
            return fetch(`${url}/${endpoint}`, {headers}).then(responseHandler);
        },
        postRequest(endpoint, data) {
            return fetch(`${url}/${endpoint}`, {headers, method: "POST", body: JSON.stringify(data)}).then(responseHandler);
        },
        putRequest(endpoint, data) {
            return fetch(`${url}/${endpoint}`, {headers, method: "PUT", body: JSON.stringify(data)}).then(responseHandler);
        },
        deleteRequest(endpoint) {
            return fetch(`${url}/${endpoint}`, {headers, method: "DELETE"}).then(responseHandler);
        }
    }; 
};
