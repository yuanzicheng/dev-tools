import { Menu } from "@arco-design/web-react";
import { IconHome, IconThunderbolt, IconFile, IconClockCircle, IconCodeBlock, IconLock, IconQrcode } from "@arco-design/web-react/icon";
import { useLocation, useNavigate } from "react-router-dom";
import { useSafeState } from "ahooks";
import { useAtom } from "jotai";
import { collapsedAtom } from "~/store/layout";
import { themeAtom } from "~/store/theme";
import { useIntl } from "react-intl";

interface MenuItem {
    path: string;
    text: string;
    icon?: React.ReactNode;
    limit?: string[];
    children?: MenuItem[];
    admin?: boolean;
}

const menus: MenuItem[] = [
    { path: "/", text: "menu.home", icon: <IconHome /> },
    { path: "/datetime", text: "menu.datetime", icon: <IconClockCircle /> },
    { path: "/json", text: "menu.json", icon: <IconCodeBlock /> },
    {
        path: "/crypto",
        text: "menu.crypto",
        icon: <IconLock />,
        children: [
            { path: "/url", text: "menu.crypto.url" },
            { path: "/base64", text: "menu.crypto.base64" },
            { path: "/sha", text: "menu.crypto.sha" },
            { path: "/md5", text: "menu.crypto.md5" },
            { path: "/jwt", text: "menu.crypto.jwt" },
        ],
    },
    { path: "/password", text: "menu.password", icon: <IconThunderbolt /> },
    { path: "/qrcode", text: "menu.qrcode", icon: <IconQrcode /> },
    {
        path: "/docs",
        text: "menu.notes",
        icon: <IconFile />,
        // children: [
        //     { path: "/linux", text: "Linux" },
        //     { path: "/git", text: "Git" },
        //     { path: "/sqlite", text: "SQLite" },
        //     { path: "/postgresql", text: "PostgreSQL" },
        //     { path: "/mongodb", text: "MongoDB" },
        //     { path: "/duckdb", text: "DuckDB" },
        //     { path: "/clickhouse", text: "ClickHouse" },
        //     { path: "/go", text: "Go" },
        //     { path: "/python", text: "Python" },
        //     { path: "/rust", text: "Rust" },
        //     { path: "/docker", text: "Docker" },
        //     { path: "/kubernetes", text: "Kubernetes" },
        //     { path: "/helm", text: "Helm" },
        // ],
    },
];

export const Menus = ({ className }: { className?: string }) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed] = useAtom(collapsedAtom);
    const [theme] = useAtom(themeAtom);
    // 保证菜单在列表页和详情页时均选中
    const [keys, setKeys] = useSafeState<string[]>([location.pathname]);
    const [openKeys, setOpenKeys] = useSafeState<string[]>([`/${location.pathname.split("/")[1]}`]);

    return (
        <Menu
            className={className}
            theme={theme}
            collapse={collapsed}
            openKeys={openKeys}
            selectedKeys={keys}
            onClickSubMenu={(_key, openKeys) => {
                setOpenKeys(openKeys);
            }}
            onClickMenuItem={(_key, _, keypath) => {
                setKeys(keypath);
            }}
        >
            {menus.map((it) =>
                it.children ? (
                    <Menu.SubMenu
                        key={it.path}
                        title={
                            <div>
                                {it.icon}
                                {intl.formatMessage({ id: it.text })}
                            </div>
                        }
                    >
                        {it.children.map((child) => (
                            <Menu.Item className="!pl-4" key={it.path + child.path} onClick={() => navigate(it.path + child.path)}>
                                {intl.formatMessage({ id: child.text })}
                            </Menu.Item>
                        ))}
                    </Menu.SubMenu>
                ) : (
                    <Menu.Item key={it.path} onClick={() => navigate(it.path)}>
                        {it.icon}
                        {intl.formatMessage({ id: it.text })}
                    </Menu.Item>
                ),
            )}
        </Menu>
    );
};
