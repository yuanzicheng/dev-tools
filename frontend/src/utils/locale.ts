import enUS from "@arco-design/web-react/es/locale/en-US";
import zhCN from "@arco-design/web-react/es/locale/zh-CN";

export const arco = (lang: string | undefined) => {
    switch (lang) {
        case "en":
            return enUS;
        case "zh":
            return zhCN;
        default:
            return zhCN;
    }
};
