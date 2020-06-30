import React from "react";
import {Link} from "react-router-dom";

const Merchants = () => {
    return (
        <>
            <h1>Merchants</h1>
            <p><Link to="/merchants/1">Merchant #1</Link></p>
        </>
    );
};

export default Merchants;
