// import { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client";
import "./index.less";
import "virtual:uno.css";
import { Provider } from "jotai";
import { Intl } from "./intl";
import { setCreateRoot } from '@arco-design/web-react/es/_util/react-dom';

setCreateRoot(ReactDOM.createRoot);
createRoot(document.getElementById("root")!).render(
    // <StrictMode>
        <Provider>
            <Intl />
        </Provider>
    // </StrictMode>,
);
