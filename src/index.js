"use strict";

import React from "react";
import {render} from "react-dom";

import Home from "./pages/Home";

window.addEventListener("load", () => {
    const root = document.getElementById("root");

    if (root === null) {
        throw new Error("Unable to find the root element.");
    }

    render(<Home />, root);
});
