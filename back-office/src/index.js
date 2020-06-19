"use strict";

import React from "react";
import {render} from "react-dom";

import Home from "./pages/Home";

window.addEventListener("load", () => {
    let root = document.getElementById("root");

    if (root === null) {
        root = document.createElement("div");

        root.setAttribute("id", "root");

        document.body.appendChild(root);
    }

    render(<Home />, root);
});
