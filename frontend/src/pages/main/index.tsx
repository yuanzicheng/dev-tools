import { Layout } from "@arco-design/web-react";
import { Header } from "./header";
import { Content } from "./content";
import { Logo } from "./logo";
import { Menus } from "./menu";
import { useAtom } from "jotai";
import { themeAtom } from "~/store/theme";
import { collapsedAtom } from "~/store/layout";
import { Nav } from "./nav";
import { useSize } from "ahooks";
import { isTauri } from "@tauri-apps/api/core";

export const Index = () => {
    const [theme] = useAtom(themeAtom);
    const [collapsed, setCollapsed] = useAtom(collapsedAtom);
    const size = useSize(document.querySelector("body"));

    console.log(`Tauri 环境: ${isTauri()}`);

    return (
        <Layout className="safe-area !h-[calc(100vh-env(safe-area-inset-top)-env(safe-area-inset-bottom))]">
            {size && size.width < 640 ? (
                <Nav />
            ) : (
                <Layout.Sider
                    width={200}
                    theme={theme}
                    collapsed={collapsed}
                    onCollapse={() => setCollapsed(!collapsed)}
                    collapsible
                    collapsedWidth={48}
                    breakpoint="lg"
                    trigger={null}
                >
                    <div className="h-full flex flex-col overflow-y-hidden">
                        <Logo className="flex-none" />
                        <Menus className="flex-1 overflow-y-auto" />
                    </div>
                </Layout.Sider>
            )}
            <Layout className="!h-full flex flex-col !bg-[var(--color-bg-1)]">
                <Header className="flex-none" />
                <Content className="flex-1 overflow-y-auto" />
            </Layout>
        </Layout>
    );
};
