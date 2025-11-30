import { Settings } from "./settings";
import { IconMenu } from "@arco-design/web-react/icon";
import { useAtom } from "jotai";
import { collapsedAtom } from "~/store/layout";
import { Logo } from "./logo";

export const Header = ({className}: {className?: string}) => {
    const [collapse, setCollapsed] = useAtom(collapsedAtom);
    return (
        <div className={`h-48px px-10px grid grid-cols-12 items-center box-border border-b-1px border-b-solid border-theme ${className}`}>
            <span className="col-span-3 text-primary text-6 font-medium cursor-pointer" onClick={() => setCollapsed(!collapse)}>
                <IconMenu />
            </span>
            <div className="col-span-6 text-center sm:invisible">
                <Logo />
            </div>
            <div className="col-span-3 flex items-center justify-end gap-2">
                <Settings />
            </div>
        </div>
    );
};
