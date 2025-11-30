/* eslint-disable @typescript-eslint/no-explicit-any */
import { Descriptions, Input, InputNumber, Select, Typography } from "@arco-design/web-react";
import { useIntl } from "react-intl";
import { tz } from "moment-timezone";
import { useSafeState, useUpdateEffect } from "ahooks";

export const TimestampToDatetime = () => {
    const intl = useIntl();
    const [timezone, setTimezone] = useSafeState("Asia/Shanghai");
    const [unit, setUnit] = useSafeState("s");
    const [input, setInput] = useSafeState<number | undefined>(undefined);
    const [output, setOutput] = useSafeState<string | undefined>(undefined);

    useUpdateEffect(() => {
        if (input) {
            let milliseconds = 0;
            let format = "YYYY-MM-DD HH:mm:ss";
            switch (unit) {
                case "s":
                    milliseconds = input * 1000;
                    break;
                case "ms":
                    format = "YYYY-MM-DD HH:mm:ss.SSS";
                    milliseconds = input;
                    break;
                case "us":
                    format = "YYYY-MM-DD HH:mm:ss.SSSSSSS";
                    milliseconds = input / 1000;
                    break;
                case "ns":
                    format = "YYYY-MM-DD HH:mm:ss.SSSSSSSSS";
                    milliseconds = input / 1000000;
                    break;
                default:
                    milliseconds = input * 1000;
            }
            const datetime = tz(milliseconds, timezone).format(format);
            setOutput(datetime);
        } else {
            setOutput(undefined);
        }
    }, [input, timezone, unit]);

    return (
        <div className="flex flex-col items-center gap-y-10">
            <Descriptions
                className="sm:w-2/3 md:w-3/5 <sm:w-full"
                column={1}
                layout="inline-vertical"
                title={
                    <div className="flex justify-center">
                        <Typography.Title heading={4}>
                            {intl.formatMessage({ id: "datetime.timestamp" })} {">>"} {intl.formatMessage({ id: "datetime.datetime" })}
                        </Typography.Title>
                    </div>
                }
                data={[
                    {
                        label: intl.formatMessage({ id: "datetime.timezone" }),
                        value: (
                            <Select
                                value={timezone}
                                onChange={setTimezone}
                                options={tz.names().map((it) => ({ label: it, value: it }))}
                                showSearch
                                filterOption={(inputValue, option) => (option as any).props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0}
                            />
                        ),
                    },
                    {
                        label: intl.formatMessage({ id: "datetime.timestamp" }),
                        value: (
                            <div className="inline-block w-full flex items-center gap-x-1">
                                <InputNumber min={0} step={1} precision={0} value={input} onChange={setInput} className="flex-1" />
                                <Select options={["s", "ms"]} value={unit} onChange={setUnit} className="flex-none !w-60px" />
                            </div>
                        ),
                    },
                    {
                        label: intl.formatMessage({ id: "datetime.datetime" }),
                        value: <Input value={output} readOnly />,
                    },
                ]}
            />
        </div>
    );
};
