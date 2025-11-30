import { useState } from "react";
import { Button, Typography, Grid, Message, Select } from "@arco-design/web-react";
import { useIntl } from "react-intl";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { useAtom } from "jotai";
import { themeAtom } from "~/store/theme";

const example = `{"name": "John Doe","age": 30,"isStudent": false,"address": {"street": "123 Main St","city": "New York", "zipcode": "10001"},"phones": [{"type": "home","number": "212 555-1234"},{"type": "mobile","number": "646 555-4567"}],"email": "john.doe@example.com"}`;

export const Index = () => {
    const intl = useIntl();
    const [theme] = useAtom(themeAtom);
    const [inputValue, setInputValue] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorPosition, setErrorPosition] = useState<{ line: number; column: number } | null>(null);
    const [indentation, setIndentation] = useState<number>(2);

    // 校验并格式化JSON
    const validateAndFormatJSON = () => {
        try {
            // 清除之前的错误信息
            setErrorMessage("");
            setErrorPosition(null);

            if (!inputValue.trim()) {
                return;
            }

            // 解析并格式化JSON
            const parsed = JSON.parse(inputValue);
            const formatted = JSON.stringify(parsed, null, indentation);
            setInputValue(formatted);
        } catch (error) {
            handleError(error);
        }
    };

    // 压缩JSON为单行
    const compressJSON = () => {
        try {
            // 清除之前的错误信息
            setErrorMessage("");
            setErrorPosition(null);

            if (!inputValue.trim()) {
                return;
            }

            // 解析并压缩JSON为单行
            const parsed = JSON.parse(inputValue);
            const compressed = JSON.stringify(parsed);
            setInputValue(compressed);
        } catch (error) {
            handleError(error);
        }
    };

    // 处理错误
    const handleError = (error: unknown) => {
        if (error instanceof Error) {
            setErrorMessage(error.message);

            // 尝试提取错误位置信息
            const positionMatch = error.message.match(/position (\d+)/);
            if (positionMatch && positionMatch[1]) {
                const position = parseInt(positionMatch[1], 10);
                const lines = inputValue.substr(0, position).split("\n");
                const line = lines.length;
                const column = lines[lines.length - 1].length + 1;
                setErrorPosition({ line, column });
            }
        }
    };

    // 清空输入内容
    const clearInput = () => {
        setInputValue("");
        // 清除错误信息
        setErrorMessage("");
        setErrorPosition(null);
    };

    // 复制格式化结果
    const copyToClipboard = () => {
        if (inputValue) {
            navigator.clipboard.writeText(inputValue);
            Message.success(intl.formatMessage({ id: "json.copy" }) + " " + intl.formatMessage({ id: "success" }));
        }
    };

    return (
        <div className="w-full flex justify-center p-2 box-border">
            <div className="md:w-2/3 sm:w-4/5 <sm:w-full">
                <Typography.Title heading={4}>{intl.formatMessage({ id: "json.title" })}</Typography.Title>

                <div className="my-5">
                    <div className="border border-theme border-solid border-1px rounded-xs mt-2 overflow-hidden">
                        <CodeMirror
                            value={inputValue}
                            height="500px"
                            extensions={[json()]}
                            theme={theme === "dark" ? githubDark : githubLight}
                            basicSetup={{
                                lineNumbers: true,
                                highlightActiveLine: true,
                                highlightSelectionMatches: true,
                                foldGutter: true,
                            }}
                            onChange={setInputValue}
                        />
                    </div>
                </div>

                <Grid.Row gutter={[10, 10]} className="mb-4 items-center">
                    <Grid.Col span={8}>
                        <Select
                            value={indentation}
                            onChange={setIndentation}
                            options={[
                                { label: "2 spaces indentation", value: 2 },
                                { label: "4 spaces indentation", value: 4 },
                            ]}
                            className="flex-1"
                        />
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Button long type="primary" onClick={validateAndFormatJSON}>
                            {intl.formatMessage({ id: "json.format" })}
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Button long type="primary" onClick={compressJSON}>
                            {intl.formatMessage({ id: "json.compress" })}
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Button long onClick={() => setInputValue(example)}>
                            Example
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Button long onClick={clearInput}>
                            {intl.formatMessage({ id: "json.clear" })}
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Button long onClick={copyToClipboard} disabled={!inputValue}>
                            {intl.formatMessage({ id: "json.copy" })}
                        </Button>
                    </Grid.Col>
                </Grid.Row>

                {(errorMessage || errorPosition) && (
                    <div className="mb-4 p-3 bg-red-500/10 rounded border border-red-500">
                        {errorMessage && <Typography.Text type="error">{errorMessage}</Typography.Text>}
                        {errorPosition && (
                            <div>
                                <Typography.Text bold>{intl.formatMessage({ id: "json.error.position" })}: </Typography.Text>
                                <Typography.Text type="error">
                                    Line {errorPosition.line}, Column {errorPosition.column}
                                </Typography.Text>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
