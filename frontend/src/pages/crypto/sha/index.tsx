/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { Button, Input, Typography, Grid, Select, Message, Radio, Upload } from "@arco-design/web-react";
import { useIntl } from "react-intl";
import jsSHA from "jssha";

const { Row, Col } = Grid;

export const SHA = () => {
    const intl = useIntl();
    const [inputType, setInputType] = useState<"text" | "file">("text");
    const [inputValue, setInputValue] = useState<string>("");
    const [outputValue, setOutputValue] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [isCalculating, setIsCalculating] = useState<boolean>(false);
    const fileRef = useRef<File | null>(null);
    const [algorithm, setAlgorithm] = useState<"SHA-1" | "SHA-224" | "SHA-256" | "SHA-384" | "SHA-512" | "SHA3-224" | "SHA3-256" | "SHA3-384" | "SHA3-512">("SHA-256");

    const shaHash = (message: string): string => {
        const shaObj = new jsSHA(algorithm, "TEXT");
        shaObj.update(message);
        return shaObj.getHash("HEX");
    };

    const shaHashFile = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const blobSlice = File.prototype.slice || (File.prototype as any).mozSlice || (File.prototype as any).webkitSlice;
            const chunkSize = 2097152; // 2MB chunks
            const chunks = Math.ceil(file.size / chunkSize);
            let currentChunk = 0;
            const spark = new jsSHA(algorithm, "ARRAYBUFFER");
            const fileReader = new FileReader();

            fileReader.onload = function (e) {
                spark.update(e.target?.result as ArrayBuffer);
                currentChunk++;

                if (currentChunk < chunks) {
                    loadNext();
                } else {
                    resolve(spark.getHash("HEX"));
                }
            };

            fileReader.onerror = function () {
                reject(new Error("File reading error"));
            };

            function loadNext() {
                const start = currentChunk * chunkSize;
                const end = start + chunkSize >= file.size ? file.size : start + chunkSize;

                fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
            }

            loadNext();
        });
    };

    const handleEncrypt = async () => {
        try {
            if (inputType === "text") {
                if (!inputValue) {
                    setOutputValue("");
                    return;
                }

                const result = shaHash(inputValue);
                setOutputValue(result);
            } else if (inputType === "file" && fileRef.current) {
                setIsCalculating(true);
                const result = await shaHashFile(fileRef.current);
                setOutputValue(result);
                setIsCalculating(false);
            } else {
                setOutputValue("");
            }
        } catch (error) {
            setIsCalculating(false);
            Message.error(String(error));
            setOutputValue("");
        }
    };

    const clearInput = () => {
        setInputValue("");
        fileRef.current = null;
        setFileName("");
    };

    const clearOutput = () => {
        setOutputValue("");
    };

    const copyToClipboard = () => {
        if (outputValue) {
            navigator.clipboard.writeText(outputValue);
            Message.success(intl.formatMessage({ id: "success" }));
        }
    };

    return (
        <div className="w-full flex justify-center p-2 box-border">
            <div className="md:w-2/3 sm:w-4/5 <sm:w-full flex flex-col items-center">
                <div className="w-full">
                    <Typography.Title heading={4}>SHA-1/224/256/384/512 | SHA3-224/256/384/512</Typography.Title>

                    <div className="mb-4">
                        <Radio.Group
                            type="button"
                            value={inputType}
                            onChange={(value) => {
                                setInputType(value as "text" | "file");
                                clearInput();
                                clearOutput();
                            }}
                        >
                            <Radio value="text">{intl.formatMessage({ id: "crypto.input.text" })}</Radio>
                            <Radio value="file">{intl.formatMessage({ id: "crypto.input.file" })}</Radio>
                        </Radio.Group>
                    </div>

                    {inputType === "text" ? (
                        <div className="mb-4">
                            <Input.TextArea value={inputValue} onChange={setInputValue} rows={6} />
                        </div>
                    ) : (
                        <div className="mb-4">
                            <div className="mt-2">
                                <Upload
                                    className="w-full"
                                    multiple={false}
                                    showUploadList={false}
                                    autoUpload={false}
                                    onChange={(_, currentFile) => {
                                        if (currentFile && currentFile.originFile) {
                                            fileRef.current = currentFile.originFile;
                                            setFileName(currentFile.originFile.name);
                                        } else {
                                            fileRef.current = null;
                                            setFileName("");
                                        }
                                    }}
                                >
                                    <div className="h-140px flex justify-center items-center rounded border border-dashed border-1px border-theme cursor-pointer bg-gray-100 hover:bg-gray-200">
                                        <p className="text-lg">{fileName || "+"}</p>
                                    </div>
                                </Upload>
                            </div>
                        </div>
                    )}

                    <Row gutter={8} className="mb-4">
                        <Col span={12}>
                            <Select
                                options={["SHA-1", "SHA-224", "SHA-256", "SHA-384", "SHA-512", "SHA3-224", "SHA3-256", "SHA3-384", "SHA3-512"]}
                                value={algorithm}
                                onChange={setAlgorithm}
                            />
                        </Col>
                        <Col span={12}>
                            <Button long type="primary" onClick={handleEncrypt} loading={isCalculating} disabled={inputType === "file" && !fileRef.current}>
                                {isCalculating ? intl.formatMessage({ id: "crypto.calculating" }) : intl.formatMessage({ id: "crypto.hash" })}
                            </Button>
                        </Col>
                    </Row>

                    <div className="mb-4">
                        <div className="flex justify-between items-center">
                            <Typography.Text>{intl.formatMessage({ id: "crypto.output" })}</Typography.Text>
                        </div>
                        <Input.TextArea className="mt-2" value={outputValue} readOnly rows={6} placeholder={intl.formatMessage({ id: "crypto.output" })} />
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
