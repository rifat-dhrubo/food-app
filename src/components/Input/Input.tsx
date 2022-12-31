import { cva } from "class-variance-authority";
import React from "react";

type Props = React.ComponentPropsWithRef<"input"> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  size?: any;
  errorMessage?: string;
};

const inputClass = cva(
  "rounded border-neutral-400/50 bg-white text-lg font-bold  text-slate-900 focus:border-neutral-200 focus:ring-2 focus:ring-neutral-800/50 dark:border-slate-700/50 dark:bg-neutral-900/70 dark:text-slate-100 dark:focus:ring-neutral-200/30",
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
  ({ errorMessage, size, name, className, ...props }, ref) => {
    return (
      <>
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
            className="pl-2 pt-1 text-sm font-bold text-red-800 dark:text-red-400"
          >
            {errorMessage}
          </p>
        ) : null}
      </>
    );
  }
);
Input.displayName = "Input";
