/* eslint-disable @typescript-eslint/no-explicit-any */
import { App } from "./App";
import { message as zh } from "./locales/zh";
import { message as en } from "./locales/en";
import { IntlProvider as IntlProviderType } from "react-intl";
import { useAtom } from "jotai";
import { langAtom } from "~/store/lang";

const IntlProvider = IntlProviderType as unknown as React.JSXElementConstructor<any>;

const messages = (lang: string | null) => {
    switch (lang) {
        case "en":
            return en;
        case "zh":
            return zh;
        default:
            return zh;
    }
};

export const Intl = () => {
    const [lang] = useAtom(langAtom);

    return (
        <IntlProvider messages={messages(lang)} locale={lang || "zh"} defaultLocale="zh">
            <App />
        </IntlProvider>
    );
};
