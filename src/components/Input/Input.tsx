import { cva } from "class-variance-authority";
import React from "react";

type Props = React.ComponentPropsWithRef<"input"> & {
  size?: any;
  errorMessage?: string;
  label: string;
};

const inputClass = cva(
  "min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-base font-medium mt-1",
  {
    variants: {
      size: {
        full: "w-full",
      },
    },
  }
);
type Ref = HTMLInputElement;

export const Input = React.forwardRef<Ref, Props>(
  ({ label, errorMessage, size, name, className, ...props }, ref) => {
    return (
      <>
        <label
          htmlFor={name}
          className="pl-1 text-sm font-bold text-zinc-900 dark:text-zinc-50"
        >
          {label}
        </label>
        <input
          name={name}
          className={inputClass({ className, size })}
          aria-describedby={`${name}-error`}
          ref={ref}
          {...props}
        />
        {errorMessage != null ? (
          <p
            id={`${name}-error`}
            className="pl-1 pt-1 text-sm font-bold text-rose-600 dark:text-rose-500"
          >
            {errorMessage}
          </p>
        ) : null}
      </>
    );
  }
);
Input.displayName = "Input";
