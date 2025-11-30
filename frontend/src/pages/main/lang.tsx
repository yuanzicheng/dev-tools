import { Button, Dropdown, Menu } from "@arco-design/web-react";
import { IconLanguage } from "@arco-design/web-react/icon";
import { useAtom } from "jotai";
import { langAtom } from "~/store/lang";

export const Lang = () => {
    const [lang, setLang] = useAtom(langAtom);

    return (
        <Dropdown
            droplist={
                <Menu
                    onClickMenuItem={(key) => {
                        sessionStorage.setItem("lang", key);
                        localStorage.setItem("lang", key);
                        setLang(key);
                    }}
                >
                    <Menu.Item key="en" className={lang === "en" ? "text-primary" : ""}>
                        English
                    </Menu.Item>
                    <Menu.Item key="zh" className={lang === "zh" ? "text-primary" : ""}>
                        中文
                    </Menu.Item>
                </Menu>
            }
            trigger={["click", "hover"]}
            position="br"
        >
            <Button className="!text-20px" type="text" icon={<IconLanguage />} />
        </Dropdown>
    );
};
