import { twMerge } from "tailwind-merge";
import { base } from "./style";
import React from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
  key?: string;
}

const H1 = ({ className, children }: Props) => (
  <h2 className={twMerge(base.h1, className)}>{children}</h2>
);

const H2 = ({ className, children }: Props) => (
  <h2 className={twMerge(base.h2, className)}>{children}</h2>
);

const H3 = ({ className, children }: Props) => (
  <h3 className={twMerge(base.h3, className)}>{children}</h3>
);

const H4 = ({ className, children }: Props) => (
  <h4 className={twMerge(base.h4, className)}>{children}</h4>
);

export { H1, H2, H3, H4 };
export type { Props };
