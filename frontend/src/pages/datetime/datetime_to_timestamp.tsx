/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Descriptions, Input, Select, Typography } from "@arco-design/web-react";
import { useIntl } from "react-intl";
import { tz } from "moment-timezone";
import { useSafeState, useUpdateEffect } from "ahooks";

export const DatetimeToTimestamp = () => {
    const intl = useIntl();
    const [timezone, setTimezone] = useSafeState("Asia/Shanghai");
    const [input, setInput] = useSafeState("");
    const [output, setOutput] = useSafeState<string | undefined>(undefined);

    useUpdateEffect(() => {
        const timestamp = input ? tz(input, timezone).unix().toString() : undefined;
        setOutput(timestamp);
    }, [input, timezone]);

    return (
        <div className="w-full flex flex-col items-center gap-y-10">
            <Descriptions
                className="sm:w-2/3 md:w-3/5 <sm:w-full"
                column={1}
                layout="inline-vertical"
                title={
                    <div className="flex justify-center">
                        <Typography.Title heading={4}>
                            {intl.formatMessage({ id: "datetime.datetime" })} {">>"} {intl.formatMessage({ id: "datetime.timestamp" })}
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
                        label: intl.formatMessage({ id: "datetime.datetime" }),
                        value: <DatePicker value={input} onChange={setInput} className="w-full" showTime format="YYYY-MM-DD HH:mm:ss" />,
                    },
                    {
                        label: intl.formatMessage({ id: "datetime.timestamp" }),
                        value: <Input addAfter="s" value={output} readOnly />,
                    },
                ]}
            />
        </div>
    );
};
