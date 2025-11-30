import { Layout } from "@arco-design/web-react";
import { Outlet } from "react-router-dom";

export const Content = ({ className }: { className?: string }) => {
    return (
        <Layout.Content id="content-xyz-1024" className={`flex flex-col p-10px box-border h-full overflow-y-auto ${className}`}>
            {/* <BackTop visibleHeight={100} className="absolute !right-50px !bottom-50px" target={() => document.getElementById("content-xyz-1024") || window} /> */}
            <div className="flex-grow">
                <Outlet />
            </div>
            {/* <div className="flex-shrink-0 py-2 flex justify-center items-center text-[var(--color-neutral-6)] text-xs">footer</div> */}
        </Layout.Content>
    );
};
