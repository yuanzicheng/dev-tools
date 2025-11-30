import { Button, ColorPicker, Descriptions, Divider, Input, Radio, Select, Slider, Switch, Typography, Upload } from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";
import { useSafeState } from "ahooks";
import { useIntl } from "react-intl";
import { QrcodeCanvas, useQrcodeDownload, type QrcodeStyle } from "react-qrcode-pretty";

export const Index = () => {
    const variants = ["standard", "rounded", "dots", "circle", "fluid", "reverse", "shower", "gravity", "morse", "italic", "inclined"];
    const intl = useIntl();
    const [setQrcode, download, isReady] = useQrcodeDownload();
    const [value, setValue] = useSafeState("");
    const [variant, setVariant] = useSafeState("standard");
    const [margin, setMargin] = useSafeState(0);
    const [padding, setPadding] = useSafeState(10);
    const [eyeColor, setEyeColor] = useSafeState<string>("#000000");
    const [bodyColor, setBodyColor] = useSafeState<string>("#000000");
    const [bgColor, setBgColor] = useSafeState<string>("#F0F0F0");
    const [bgRounded, setBgRounded] = useSafeState(false);
    const [divider, setDivider] = useSafeState(false);
    const [level, setLevel] = useSafeState<"L" | "M" | "Q" | "H">("M");
    const [image, setImage] = useSafeState<string | null>(null);

    return (
        <div className="w-full flex justify-center p-2 box-border">
            <div className="md:w-1/2 sm:w-2/3 <sm:w-full">
                <Descriptions
                    column={1}
                    labelStyle={{ paddingRight: 20 }}
                    title={<Typography.Title heading={4}>{intl.formatMessage({ id: "qrcode.title" })}</Typography.Title>}
                    data={[
                        {
                            label: intl.formatMessage({ id: "qrcode.value" }),
                            value: <Input showWordLimit maxLength={200} value={value} onChange={setValue} />,
                        },
                        {
                            label: intl.formatMessage({ id: "qrcode.variant" }),
                            value: <Select value={variant} onChange={setVariant} options={variants.map((it) => ({ value: it, label: it }))} />,
                        },
                        {
                            label: intl.formatMessage({ id: "qrcode.margin" }),
                            value: (
                                <Slider
                                    range={false}
                                    showInput={true}
                                    value={margin}
                                    max={100}
                                    step={1}
                                    onChange={(v) => {
                                        if (typeof v === "number") {
                                            setMargin(v);
                                        }
                                    }}
                                />
                            ),
                        },
                        {
                            label: intl.formatMessage({ id: "qrcode.padding" }),
                            value: (
                                <Slider
                                    range={false}
                                    showInput={true}
                                    value={padding}
                                    max={100}
                                    step={1}
                                    onChange={(v) => {
                                        if (typeof v === "number") {
                                            setPadding(v);
                                        }
                                    }}
                                />
                            ),
                        },
                        {
                            label: intl.formatMessage({ id: "qrcode.eyeColor" }),
                            value: (
                                <div className="text-right">
                                    <ColorPicker
                                        className="w-120px"
                                        value={eyeColor}
                                        showPreset
                                        showText
                                        onChange={(value) => {
                                            if (typeof value === "string") {
                                                setEyeColor(value);
                                            }
                                        }}
                                    />
                                </div>
                            ),
                        },
                        {
                            label: intl.formatMessage({ id: "qrcode.bodyColor" }),
                            value: (
                                <div className="text-right">
                                    <ColorPicker
                                        className="w-120px"
                                        value={bodyColor}
                                        showPreset
                                        showText
                                        onChange={(value) => {
                                            if (typeof value === "string") {
                                                setBodyColor(value);
                                            }
                                        }}
                                    />
                                </div>
                            ),
                        },
                        {
                            label: intl.formatMessage({ id: "qrcode.bgColor" }),
                            value: (
                                <div className="text-right">
                                    <ColorPicker
                                        className="w-120px"
                                        value={bgColor}
                                        showPreset
                                        showText
                                        onChange={(value) => {
                                            if (typeof value === "string") {
                                                setBgColor(value);
                                            }
                                        }}
                                    />
                                </div>
                            ),
                        },
                        {
                            label: intl.formatMessage({ id: "qrcode.bgRounded" }),
                            value: (
                                <div className="text-right">
                                    <Switch checked={bgRounded} onChange={setBgRounded} />
                                </div>
                            ),
                        },
                        {
                            label: intl.formatMessage({ id: "qrcode.divider" }),
                            value: (
                                <div className="text-right">
                                    <Switch checked={divider} onChange={setDivider} />
                                </div>
                            ),
                        },
                        {
                            label: intl.formatMessage({ id: "qrcode.level" }),
                            value: (
                                <div className="text-right">
                                    <Radio.Group options={["L", "M", "Q", "H"].map((it) => ({ label: it, value: it }))} type="button" value={level} onChange={setLevel} />
                                </div>
                            ),
                        },
                        {
                            label: "Icon",
                            value: (
                                <div className="text-right">
                                    <Upload
                                        listType="picture-card"
                                        imagePreview
                                        limit={1}
                                        accept="image/*"
                                        autoUpload={false}
                                        onChange={(fileList) => {
                                            if (fileList.length > 0 && fileList[0].originFile) {
                                                // 创建FileReader对象
                                                const reader = new FileReader();
                                                // 设置onload回调函数，当读取完成时会调用
                                                reader.onload = (e) => {
                                                    // 获取base64数据
                                                    const base64Data = e.target?.result as string;
                                                    setImage(base64Data);
                                                };
                                                // 读取文件内容为base64
                                                reader.readAsDataURL(fileList[0].originFile);
                                            } else {
                                                setImage(null);
                                            }
                                        }}
                                    >
                                        <Button icon={<IconPlus />}>{intl.formatMessage({ id: "qrcode.selectImage" })}</Button>
                                    </Upload>
                                </div>
                            ),
                        },
                    ]}
                />
                <Divider />
                {value && (
                    <div className="flex flex-col items-center">
                        <QrcodeCanvas
                            value={value}
                            variant={variant as QrcodeStyle}
                            color={{ eyes: eyeColor, body: bodyColor }}
                            padding={padding}
                            margin={margin}
                            bgColor={bgColor}
                            bgRounded={bgRounded}
                            onReady={setQrcode}
                            divider={divider}
                            level={level}
                            image={image ? { src: image } : undefined}
                        />

                        <Button className="mt-4" onClick={() => download(`qrcode_${new Date().getTime()}`)} disabled={!isReady}>
                            {intl.formatMessage({ id: "download" })}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
