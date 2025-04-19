import React, { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

type Props = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div className={`container px-24 mx-auto ${inter.className} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
