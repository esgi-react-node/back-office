import PropTypes from "prop-types";
import React, {createContext, useState, useContext} from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userConnected, setUserConnected] = useState(false);

    return (
        <UserProvider.Provider value={{userConnected, setUserConnected}}>
            {children}
        </UserProvider.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);

UserProvider.propTypes = {
    children: PropTypes.node
};
