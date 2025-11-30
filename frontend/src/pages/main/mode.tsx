import { Button, Tooltip } from "@arco-design/web-react";
import { IconSun, IconMoon } from "@arco-design/web-react/icon";
import { useMount } from "ahooks";
import { useAtom } from "jotai";
import { themeAtom } from "~/store/theme";
export const Mode = ({ className }: { className?: string }) => {
    const [theme, setTheme] = useAtom(themeAtom);

    useMount(() => {
        if (theme === "light") {
            document.body.removeAttribute("arco-theme");
        } else {
            document.body.setAttribute("arco-theme", "dark");
        }
    });

    return (
        <div className={className}>
            <Tooltip position="right" content={theme === "light" ? "switch to dark mode" : "switch to light mode"}>
                <Button
                    className="!text-20px"
                    type="text"
                    icon={theme === "light" ? <IconMoon /> : <IconSun />}
                    onClick={() => {
                        const mode = theme === "light" ? "dark" : "light";
                        localStorage.setItem("theme", mode);
                        setTheme(mode);
                        if (mode === "light") {
                            document.body.removeAttribute("arco-theme");
                        } else {
                            document.body.setAttribute("arco-theme", "dark");
                        }
                    }}
                />
            </Tooltip>
        </div>
    );
};
