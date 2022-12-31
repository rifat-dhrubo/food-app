import * as React from "react";

export function getInitialColorMode(): "dark" | "light" {
  // SSR default
  if (typeof window === "undefined") {
    return "light";
  }
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
  // color themes, let's default to 'light'.
  return "light";
}

type ThemeProps = {
  colorMode: "dark" | "light";
  setColorMode: (value: "dark" | "light") => void;
};

const ThemeContext = React.createContext<ThemeProps>({
  colorMode: "dark",
  setColorMode: () => null,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, rawSetColorMode] = React.useState(getInitialColorMode);

  const setColorMode = (value: "dark" | "light") => {
    // Persist it on update
    localStorage.setItem("color-mode", value);
    console.log(localStorage.getItem("color-mode"));

    rawSetColorMode(value);
  };
  React.useEffect(
    function addDarkModeClass() {
      if (typeof window === "undefined") return;
      const root = document.body.classList;
      if (colorMode === "dark") {
        root.remove("dark");
      } else {
        root.add("dark");
      }
    },
    [colorMode]
  );
  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("Must be within theme context tree");
  }

  return context;
};
