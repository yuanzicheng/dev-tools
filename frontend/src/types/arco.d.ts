declare module "@arco-design/color" {
    export type Hsv = { h: number; s: number; v: number };
    export type Rgb = { r: number; g: number; b: number };

    export function generate(color: string, options?: { list?: boolean; dark?: boolean }): string[] | string;
    export function getRgbStr(color: Hsv | Rgb | string): string;
}