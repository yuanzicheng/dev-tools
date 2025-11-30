import { useSize } from "ahooks";
import { useAtom } from "jotai";
import { collapsedAtom } from "~/store/layout";
import LogoImage from "~/assets/logo.svg";

export const Logo = ({ className }: { className?: string }) => {
    const [collapsed] = useAtom(collapsedAtom);
    const size = useSize(document.querySelector("body"));
    return (
        <div className={`!h-48px font-bold text-22px <sm:flex-inline sm:flex items-center justify-center gap-2 text-primary ${className}`}>
            <img src={LogoImage} />
            {size && size.width >= 640 && collapsed ? null : "Dev Tools"}
        </div>
    );
};
