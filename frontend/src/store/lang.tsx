import { atom } from "jotai";

export const langAtom = atom(sessionStorage.getItem("lang") || localStorage.getItem("lang") || "en");
