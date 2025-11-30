import { Button, Checkbox, InputNumber, Space, Typography, Divider, Message } from "@arco-design/web-react";
import { useIntl } from "react-intl";
import { useSafeState } from "ahooks";

export const Index = () => {
    const intl = useIntl();

    const [length, setLength] = useSafeState<number>(20);
    const [includeUppercase, setIncludeUppercase] = useSafeState<boolean>(true);
    const [includeLowercase, setIncludeLowercase] = useSafeState<boolean>(true);
    const [includeNumbers, setIncludeNumbers] = useSafeState<boolean>(true);
    const [includeSymbols, setIncludeSymbols] = useSafeState<boolean>(true);
    const [count, setCount] = useSafeState<number>(1);
    const [generatedPasswords, setGeneratedPasswords] = useSafeState<string[]>([]);

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const generatePasswords = () => {
        if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
            Message.error(intl.formatMessage({ id: "password.error.select" }));
            return;
        }

        let chars = "";
        if (includeUppercase) chars += uppercaseChars;
        if (includeLowercase) chars += lowercaseChars;
        if (includeNumbers) chars += numberChars;
        if (includeSymbols) chars += symbolChars;

        const newPasswords: string[] = [];
        for (let i = 0; i < count; i++) {
            let password = "";
            for (let j = 0; j < length; j++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                password += chars[randomIndex];
            }
            newPasswords.push(password);
        }

        setGeneratedPasswords(newPasswords);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="w-full flex justify-center p-2 box-border">
            <div className="md:w-1/2 sm:w-2/3 <sm:w-full">
                <Typography.Title heading={4}>{intl.formatMessage({ id: "password.generator" })}</Typography.Title>
                <Space size="large" direction="vertical" style={{ width: "100%" }}>
                    <div className="flex items-center gap-2">
                        <Typography.Text>{intl.formatMessage({ id: "password.length" })}</Typography.Text>
                        <InputNumber className="!w-100px" min={4} max={64} step={1} precision={0} value={length} onChange={(value) => setLength(value)} />
                    </div>
                    <div>
                        <Typography.Text>{intl.formatMessage({ id: "password.include" })}</Typography.Text>
                        <div className="mt-2">
                            <Checkbox checked={includeUppercase} onChange={setIncludeUppercase}>
                                {intl.formatMessage({ id: "password.uppercase" })}
                            </Checkbox>
                        </div>
                        <div className="mt-2">
                            <Checkbox checked={includeLowercase} onChange={setIncludeLowercase}>
                                {intl.formatMessage({ id: "password.lowercase" })}
                            </Checkbox>
                        </div>
                        <div className="mt-2">
                            <Checkbox checked={includeNumbers} onChange={setIncludeNumbers}>
                                {intl.formatMessage({ id: "password.numbers" })}
                            </Checkbox>
                        </div>
                        <div className="mt-2">
                            <Checkbox checked={includeSymbols} onChange={setIncludeSymbols}>
                                {intl.formatMessage({ id: "password.symbols" })}
                            </Checkbox>
                        </div>
                    </div>

                    <div className="flex items-center pap-2">
                        <Typography.Text>{intl.formatMessage({ id: "password.count" })}</Typography.Text>
                        <InputNumber className="!w-100px" min={1} max={100} step={1} precision={0} value={count} onChange={(value) => setCount(value)} />
                    </div>

                    <Button type="primary" onClick={generatePasswords}>
                        {intl.formatMessage({ id: "password.generate" })}
                    </Button>

                    {generatedPasswords.length > 0 && (
                        <>
                            <Divider orientation="left">{intl.formatMessage({ id: "password.result.title" })}</Divider>
                            {generatedPasswords.map((it, index) => (
                                <div className="flex items-center justify-between w-full" key={index}>
                                    <Typography.Text code>{it}</Typography.Text>
                                    <Button type="text" size="small" onClick={() => copyToClipboard(it)}>
                                        {intl.formatMessage({ id: "password.copy" })}
                                    </Button>
                                </div>
                            ))}
                        </>
                    )}
                </Space>
            </div>
        </div>
    );
};
