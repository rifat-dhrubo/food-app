import * as React from "react";

export function getInitialColorMode(): "dark" | "light" {
  const persistedColorPreference = window.localStorage.getItem("color-mode") as
    | "dark"
    | "light";
  const hasPersistedPreference = typeof persistedColorPreference === "string";
  // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null.
  if (hasPersistedPreference) {
    return persistedColorPreference;
  }
  // If they haven't been explicit, let's check the media
  // query
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const hasMediaQueryPreference = typeof mql.matches === "boolean";
  if (hasMediaQueryPreference) {
    return mql.matches ? "dark" : "light";
  }
  // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'dark'.
  return "dark";
}

type Props = {
  colorMode: "dark" | "light";
  setColorMode: (value: "dark" | "light") => void;
};

export const ThemeContext = React.createContext<Props>({
  colorMode: "dark",
  setColorMode: () => null,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, rawSetColorMode] = React.useState(getInitialColorMode);

  const setColorMode = (value: "dark" | "light") => {
    rawSetColorMode(value);
    // Persist it on update
    window.localStorage.setItem("color-mode", value);
  };
  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
