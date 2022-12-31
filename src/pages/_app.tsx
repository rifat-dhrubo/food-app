import "../styles/globals.css";
import "src/styles/nProgress.css";

import { Nunito } from "@next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Router } from "next/router";
import NProgress from "nprogress";

import { ThemeProvider } from "src/utils/darkmode";

import { trpc } from "../utils/trpc";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLayout = (Component as any).getLayout || ((page: any) => page);

  return (
    <ThemeProvider>
      <div
        className={`h-full min-h-screen bg-gray-100 dark:bg-neutral-900 ${nunito.variable} font-sans text-slate-900 dark:text-slate-100`}
      >
        <style jsx global>{`
          *,
          *::before,
          *::after {
            font-family: ${nunito.style.fontFamily};
          }
        `}</style>
        <SessionProvider session={session}>
          {getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </div>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
