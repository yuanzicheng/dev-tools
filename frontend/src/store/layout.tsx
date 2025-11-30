import { atom } from "jotai";

export const collapsedAtom = atom(document.body.clientWidth < 640 ? true : false);
