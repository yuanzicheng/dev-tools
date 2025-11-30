import { atom } from "jotai";

export const themeAtom = atom<"dark" | "light">(localStorage.getItem("theme") === "dark" ? "dark" : "light");
export const primaryColorAtom = atom(localStorage.getItem("primary-color") || "#209876");
