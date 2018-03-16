import React from "react";
import { setConfig } from 'react-hot-loader'
import { render } from "react-dom";
import Routes from "./routes";



setConfig({ logLevel: 'debug' })

const root = document.getElementById("root");

render(<Routes />, root);
