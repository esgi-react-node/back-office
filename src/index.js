"use strict";

import React from "react";
import {render} from "react-dom";

import App from "./App";

window.addEventListener("load", () => {
    let root = document.getElementById("root");

    if (root === null) {
        root = document.createElement("div");

        root.setAttribute("id", "root");

        document.body.appendChild(root);
    }

    render(<App />, root);
});
