import React from "react";
import { HiSun, HiMoon } from "react-icons/hi2";

import { ClientOnly } from "src/components/ClientOnly";
import { Input } from "src/components/Input";
import { Layout } from "src/components/Layout";
import { useTheme } from "src/utils/darkmode";
const SignIn = () => {
  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-sm rounded border border-zinc-100 bg-white py-8 px-4 backdrop-blur-sm dark:border-zinc-700/40 dark:bg-zinc-900/30">
        <form>
          <Input
            label="Name"
            type="text"
            className="w-full "
            placeholder="Rifat Hossain"
            errorMessage="Required"
          />
        </form>
      </div>
    </div>
  );
};

export default SignIn;

SignIn.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};
