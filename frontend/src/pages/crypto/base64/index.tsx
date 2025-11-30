import { Button, Input, Typography, Grid, Message } from "@arco-design/web-react";
import { useIntl } from "react-intl";
import { useSafeState } from "ahooks";
import { useCallback } from "react";

const { Row, Col } = Grid;

export const Base64 = () => {
    const intl = useIntl();
    const [inputValue, setInputValue] = useSafeState<string>("");
    const [outputValue, setOutputValue] = useSafeState<string>("");
    const [errorMessage, setErrorMessage] = useSafeState<string>("");

    // Base64编码
    const base64Encode = useCallback(() => {
        if (!inputValue) {
            setOutputValue("");
            setErrorMessage("");
            return;
        }

        try {
            const result = btoa(
                encodeURIComponent(inputValue).replace(/%([0-9A-F]{2})/g, (_, p1) => {
                    return String.fromCharCode(parseInt(p1, 16));
                }),
            );
            setOutputValue(result);
            setErrorMessage(""); // 成功时清除错误信息
        } catch (e) {
            const errorMsg = "Base64 encoding failed";
            console.error("Base64 encode error:", e);
            setErrorMessage(errorMsg);
            setOutputValue("");
        }
    }, [inputValue, setOutputValue, setErrorMessage]);

    // Base64解码
    const base64Decode = useCallback(() => {
        if (!inputValue) {
            setOutputValue("");
            setErrorMessage("");
            return;
        }

        try {
            const result = decodeURIComponent(
                atob(inputValue)
                    .split("")
                    .map((c) => {
                        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join(""),
            );
            setOutputValue(result);
            setErrorMessage(""); // 成功时清除错误信息
        } catch (e) {
            const errorMsg = "Base64 decoding failed";
            console.error("Base64 decode error:", e);
            setErrorMessage(errorMsg);
            setOutputValue("");
        }
    }, [inputValue, setOutputValue, setErrorMessage]);

    const clearInput = () => {
        setInputValue("");
        setErrorMessage(""); // 清空输入时也清除错误信息
    };

    const clearOutput = () => {
        setOutputValue("");
        setErrorMessage(""); // 清空输出时也清除错误信息
    };

    const copyToClipboard = () => {
        if (outputValue) {
            navigator.clipboard.writeText(outputValue);
            Message.success("Copied to clipboard successfully.");
        }
    };

    return (
        <div className="w-full flex justify-center p-2 box-border">
            <div className="md:w-2/3 sm:w-4/5 <sm:w-full flex flex-col items-center">
                <div className="w-full">
                    <Typography.Title heading={4}>Base64 Encode/Decode</Typography.Title>

                    <div className="mb-4">
                        <Typography.Text>{intl.formatMessage({ id: "crypto.input" })}</Typography.Text>
                        <Input.TextArea className="mt-2" value={inputValue} onChange={setInputValue} rows={6} />
                    </div>

                    <Row gutter={8} className="mb-4">
                        <Col span={12}>
                            <Button long type="primary" onClick={base64Encode}>
                                Encode
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button long type="primary" onClick={base64Decode}>
                                Decode
                            </Button>
                        </Col>
                    </Row>

                    {/* 错误信息显示 */}
                    {errorMessage && (
                        <div className="mb-4 p-3 bg-red-500/10 rounded border border-red-500">
                            <Typography.Text type="error">{errorMessage}</Typography.Text>
                        </div>
                    )}

                    <div className="mb-4">
                        <div className="flex justify-between items-center">
                            <Typography.Text>{intl.formatMessage({ id: "crypto.output" })}</Typography.Text>
                        </div>
                        <Input.TextArea className="mt-2" value={outputValue} readOnly rows={6} />
                    </div>

                    <Row gutter={8}>
                        <Col span={8}>
                            <Button long onClick={copyToClipboard} disabled={!outputValue}>
                                {intl.formatMessage({ id: "crypto.copy" })}
                            </Button>
                        </Col>
                        <Col span={8}>
                            <Button long onClick={clearInput}>
                                {intl.formatMessage({ id: "crypto.clear.input" })}
                            </Button>
                        </Col>
                        <Col span={8}>
                            <Button long onClick={clearOutput}>
                                {intl.formatMessage({ id: "crypto.clear.output" })}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};
