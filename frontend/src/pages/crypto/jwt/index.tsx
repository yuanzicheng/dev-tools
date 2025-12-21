import { Button, Input, Typography, Grid, Message } from "@arco-design/web-react";
import { useIntl } from "react-intl";
import { useSafeState } from "ahooks";
import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";

const { Row, Col } = Grid;

export const JWT = () => {
    const intl = useIntl();
    const [inputValue, setInputValue] = useSafeState<string>("");
    const [outputValue, setOutputValue] = useSafeState<string>("");
    const [errorMessage, setErrorMessage] = useSafeState<string>("");

    // 解析JWT
    const parseJWT = useCallback(() => {
        if (!inputValue) {
            setOutputValue("");
            setErrorMessage("");
            return;
        }

        try {
            // 使用jwt-decode库解析JWT
            const decodedHeader = jwtDecode(inputValue, { header: true });
            const decodedPayload = jwtDecode(inputValue);

            // 格式化输出
            const headerStr = JSON.stringify(decodedHeader, null, 2);
            const payloadStr = JSON.stringify(decodedPayload, null, 2);

            // 获取签名部分
            const parts = inputValue.split(".");
            const signature = parts[2] || "None";

            // 组合结果
            const result = `Header:\n${headerStr}\n\nPayload:\n${payloadStr}\n\nSignature:\n${signature}`;

            setOutputValue(result);
            setErrorMessage("");
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : "JWT parsing failed";
            console.error("JWT parse error:", e);
            setErrorMessage(errorMsg);
            setOutputValue("");
        }
    }, [inputValue, setOutputValue, setErrorMessage]);

    const clearInput = () => {
        setInputValue("");
        setErrorMessage("");
    };

    const clearOutput = () => {
        setOutputValue("");
        setErrorMessage("");
    };

    const copyToClipboard = () => {
        if (outputValue) {
            navigator.clipboard.writeText(outputValue);
            Message.success(intl.formatMessage({ id: "crypto.copy" }));
        }
    };

    return (
        <div className="w-full flex justify-center p-2 box-border">
            <div className="md:w-2/3 sm:w-4/5 <sm:w-full flex flex-col items-center">
                <div className="w-full">
                    <Typography.Title heading={4}>{intl.formatMessage({ id: "menu.crypto.jwt" })}</Typography.Title>

                    <div className="mb-4">
                        <Typography.Text>{intl.formatMessage({ id: "crypto.input" })}</Typography.Text>
                        <Input.TextArea className="mt-2" value={inputValue} onChange={setInputValue} placeholder="Enter JWT token" rows={6} />
                    </div>

                    <Row gutter={8} className="mb-4">
                        <Col span={24}>
                            <Button long type="primary" onClick={parseJWT}>
                                Parse JWT
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
                        <Input.TextArea className="mt-2" value={outputValue} readOnly rows={12} placeholder="Parsed JWT result will appear here" />
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
