import { Button, Drawer, Form, Select, ColorPicker } from "@arco-design/web-react";
import { IconSettings } from "@arco-design/web-react/icon";
import { useMount, useSafeState } from "ahooks";
import { useAtom } from "jotai";
import { langAtom } from "~/store/lang";
import { primaryColorAtom } from "~/store/theme";
import { Mode } from "./mode";
import { skin } from "~/utils/theme";
import { useIntl } from "react-intl";

export const Settings = ({ className }: { className?: string }) => {
    const intl = useIntl();
    const [visible, setVisible] = useSafeState(false);
    const [lang, setLang] = useAtom(langAtom);
    const [primary, setPrimary] = useAtom(primaryColorAtom);

    useMount(() => skin(primary));

    return (
        <div className={className}>
            <Drawer
                title={intl.formatMessage({ id: "settings" })}
                className="<sm:w-9/10! sm:w-1/2! md:w-2/5! !lg:w-400px"
                visible={visible}
                afterOpen={() => setVisible(true)}
                afterClose={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                escToExit={true}
                autoFocus={false}
                focusLock={true}
                footer={null}
            >
                <Form labelCol={{ span: 7 }} wrapperCol={{ span: 17 }} layout="horizontal">
                    <Form.Item label={intl.formatMessage({ id: "lang" })} labelAlign="left">
                        <Select value={lang} onChange={setLang}>
                            <Select.Option value="en">English</Select.Option>
                            <Select.Option value="zh">中文</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={intl.formatMessage({ id: "theme" })} labelAlign="left">
                        <Mode />
                    </Form.Item>
                    <Form.Item label={intl.formatMessage({ id: "skin" })} labelAlign="left">
                        <ColorPicker
                            defaultValue={primary}
                            format="hex"
                            showText
                            showPreset
                            disabledAlpha
                            onChange={(color) => {
                                if (typeof color === "string") {
                                    skin(color);
                                    setPrimary(color);
                                    localStorage.setItem("primary-color", color);
                                }
                            }}
                        />
                    </Form.Item>
                </Form>
            </Drawer>
            <Button className="!text-20px" type="text" icon={<IconSettings />} onClick={() => setVisible((v) => !v)} />
        </div>
    );
};
