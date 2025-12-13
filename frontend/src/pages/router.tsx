import { Routes, Route, HashRouter } from "react-router-dom";
import { Index as Main } from "~/pages/main";
import { Index as Home } from "~/pages/home";
import { Index as Datetime } from "~/pages/datetime";
import { URL } from "./crypto/url";
import { Base64 } from "~/pages/crypto/base64";
import { SHA } from "~/pages/crypto/sha";
import { MD5 } from "~/pages/crypto/md5";
import { Index as Password } from "~/pages/password";
import { Index as Json } from "~/pages/json";
import { Index as QRCode } from "~/pages/qrcode";
import { Index as Docs } from "~/pages/docs";
import { Index as Login } from "~/pages/login";
import { NotFound } from "./not-found";

const basename = import.meta.env.VITE_ROUTER_BASENAME;

export const Router = () => {
    return (
        <div className="w-screen h-screen overflow-y-hidden">
            <HashRouter {...(basename ? { basename } : {})}>
                <Routes>
                    <Route path="/" element={<Main />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/datetime" element={<Datetime />} />
                        <Route path="/qrcode" element={<QRCode />} />
                        <Route path="/password" element={<Password />} />
                        <Route path="/crypto/url" element={<URL />} />
                        <Route path="/crypto/base64" element={<Base64 />} />
                        <Route path="/crypto/sha" element={<SHA />} />
                        <Route path="/crypto/md5" element={<MD5 />} />
                        <Route path="/json" element={<Json />} />
                        <Route path="/docs" element={<Docs />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </HashRouter>
        </div>
    );
};
