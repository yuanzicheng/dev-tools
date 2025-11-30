import "./App.less";
import { Router } from "~/pages/router";
import "@arco-design/web-react/es/_util/react-19-adapter"; // @sideEffects
import { ConfigProvider, Message } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import { useIntl } from "react-intl";
import { useAtom } from "jotai";
import { langAtom } from "~/store/lang";
import { arco } from "~/utils/locale";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@arco-design/web-react";
import { useMount } from "ahooks";
import { themeAtom } from "~/store/theme";

export const App = () => {
    const intl = useIntl();
    const [lang] = useAtom(langAtom);
    const [theme] = useAtom(themeAtom);

    useMount(() => {
        if (theme === "light") {
            document.body.removeAttribute("arco-theme");
        } else {
            document.body.setAttribute("arco-theme", "dark");
        }
    });

    return (
        <ConfigProvider
            locale={arco(lang)}
            componentConfig={{
                Form: {
                    validateMessages: {
                        required: () =>
                            `${intl.formatMessage({ id: "common.required" })}`,
                    },
                },
            }}
        >
            <ErrorBoundary
                fallbackRender={({ error }) => {
                    return (
                        <div className="w-screen h-screen flex justify-center items-center">
                            <div className="text-center">
                                <div className="text-orange-500 text-lg font-bold mb-4">
                                    Oops, there's something wrong with this page.
                                </div>
                                <div className="bg-red-500/10 p-4 m-4 rounded">{error.message}</div>
                                <Button
                                    type="outline"
                                    onClick={() => {
                                        navigator.clipboard
                                            .writeText(`URL: ${window.location}\n${error.toString()}`)
                                            .then(() => Message.info(`Copied to clipboard`));
                                    }}
                                >
                                    Copy Error Message
                                </Button>
                            </div>
                        </div>
                    );
                }}
            >
                <Router />
            </ErrorBoundary>
        </ConfigProvider>
    );
};
