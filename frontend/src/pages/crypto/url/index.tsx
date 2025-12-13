import { Button, Input, Typography, Grid, Message } from "@arco-design/web-react";
import { useIntl } from "react-intl";
import { useSafeState } from "ahooks";
import { useCallback } from "react";

const { Row, Col } = Grid;

export const URL = () => {
    const intl = useIntl();
    const [inputValue, setInputValue] = useSafeState<string>("");
    const [outputValue, setOutputValue] = useSafeState<string>("");
    const [errorMessage, setErrorMessage] = useSafeState<string>("");

    // URLEncode
    const urlEncode = useCallback(() => {
        if (!inputValue) {
            setOutputValue("");
            setErrorMessage("");
            return;
        }

        try {
            const result = encodeURIComponent(inputValue);
            setOutputValue(result);
            setErrorMessage("");
        } catch (e) {
            const errorMsg = "URL encoding failed";
            console.error("URL encode error:", e);
            setErrorMessage(errorMsg);
            setOutputValue("");
        }
    }, [inputValue, setOutputValue, setErrorMessage]);

    // URLDecode
    const urlDecode = useCallback(() => {
        if (!inputValue) {
            setOutputValue("");
            setErrorMessage("");
            return;
        }

        try {
            const result = decodeURIComponent(inputValue);
            setOutputValue(result);
            setErrorMessage("");
        } catch (e) {
            const errorMsg = "URL decoding failed";
            console.error("URL decode error:", e);
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
            Message.success("Copied to clipboard successfully.");
        }
    };

    return (
        <div className="w-full flex justify-center p-2 box-border">
            <div className="md:w-2/3 sm:w-4/5 <sm:w-full flex flex-col items-center">
                <div className="w-full">
                    <Typography.Title heading={4}>URL Encode/Decode</Typography.Title>

                    <div className="mb-4">
                        <Typography.Text>{intl.formatMessage({ id: "crypto.input" })}</Typography.Text>
                        <Input.TextArea className="mt-2" value={inputValue} onChange={setInputValue} rows={6} />
                    </div>

                    <Row gutter={8} className="mb-4">
                        <Col span={12}>
                            <Button long type="primary" onClick={urlEncode}>
                                Encode
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button long type="primary" onClick={urlDecode}>
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