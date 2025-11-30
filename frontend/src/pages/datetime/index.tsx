import { DatetimeToTimestamp } from "./datetime_to_timestamp";
import { TimestampToDatetime } from "./timestamp_to_datetime";

export const Index = () => {
    return (
        <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6 <md:col-span-12">
                <DatetimeToTimestamp />
            </div>
            <div className="col-span-6 <md:col-span-12">
                <TimestampToDatetime />
            </div>
        </div>
    );
};
