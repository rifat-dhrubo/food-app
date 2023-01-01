import React from "react";
import { HiSun, HiMoon } from "react-icons/hi2";

import { useTheme } from "src/utils/darkmode";

import { ClientOnly } from "../ClientOnly";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const { colorMode, setColorMode } = useTheme();

  const toggleColorMode = () => {
    if (colorMode === "dark") {
      setColorMode("light");
    } else {
      setColorMode("dark");
    }
  };
  return (
    <>
      <header className="fixed z-20 flex h-16 w-full items-center justify-between bg-zinc-400/20 px-6 backdrop-blur-sm dark:bg-zinc-800/90">
        <span className="text-lg font-bold">Home</span>
        <ClientOnly>
          <button
            type="button"
            onClick={toggleColorMode}
            className="rounded-xl px-3 py-3  text-zinc-700 focus:outline-none focus:ring-4 focus:ring-zinc-500 dark:text-zinc-300"
          >
            <span className="sr-only">
              Toggle {colorMode === "dark" ? "light" : "dark"} mode
            </span>
            {colorMode === "dark" ? (
              <HiSun className="h-6 w-6" />
            ) : (
              <HiMoon className="h-6 w-6" />
            )}
          </button>
        </ClientOnly>
      </header>
      <div className="pt-16">{children}</div>
    </>
  );
};
