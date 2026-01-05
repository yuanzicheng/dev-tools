import { BackTop, Layout } from "@arco-design/web-react";
import { Outlet } from "react-router-dom";

export const Content = ({ className }: { className?: string }) => {
    return (
        <Layout.Content id="content-xyz-1024" className={className}>
            <BackTop visibleHeight={100} className="absolute !right-50px !bottom-50px" target={() => document.getElementById("content-xyz-1024") || window} />
            <div className="h-full p-10px box-border overflow-y-auto flex flex-col">
                <Outlet />
            </div>
        </Layout.Content>
    );
};
