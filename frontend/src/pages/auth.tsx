import React from "react";
import { Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "~/store/global";

export const Auth = ({ children }: { children: React.JSX.Element }) => {
    const [user] = useAtom(userAtom);
    if (!user) {
        if (!sessionStorage.getItem("token")) {
            return <Navigate to="/login" state={{ from: location.pathname }} />;
        }
        return null;
    }
    return children;
};
