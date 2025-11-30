import { generate, getRgbStr, type Hsv, type Rgb } from "@arco-design/color";

export const skin = (color: string) => {
    const generated = generate(color, {
        list: true,
    });
    const list = (Array.isArray(generated) ? generated : [generated]).map((x: string | Hsv | Rgb) => getRgbStr(x));
    list.forEach((x: string | null, i: number) => {
        document.body.style.setProperty("--primary-" + (i + 1), x);
    });
};
