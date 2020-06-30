import React from "react";
import {useParams} from "react-router-dom";

const Merchant = () => {
    const {id} = useParams();

    return (
        <h1>Merchant #{id}</h1>
    );
};

export default Merchant;
