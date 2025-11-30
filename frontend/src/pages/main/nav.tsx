import { Drawer } from "@arco-design/web-react";
import { Menus } from "./menu";
import { useAtom } from "jotai";
import { collapsedAtom } from "~/store/layout";
import { Logo } from "./logo";

export const Nav = ({ className }: { className?: string }) => {
    const [collapsed, setCollapsed] = useAtom(collapsedAtom);
    return (
        <Drawer
            className={`${className} nopadding`}
            title={<Logo />}
            width={220}
            placement="left"
            visible={!collapsed}
            headerStyle={{height: "48px"}}
            afterClose={() => setCollapsed(true)}
            afterOpen={() => setCollapsed(false)}
            onCancel={() => setCollapsed(true)}
            escToExit
            maskClosable
            autoFocus={false}
            focusLock={true}
            footer={null}
        >
            <Menus />
        </Drawer>
    );
};
