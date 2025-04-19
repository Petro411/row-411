import React, { memo } from "react";
import Logo from "./Logo";
import Container from "./Container";
import { homeRoutes } from "@/config/HomeRoutes";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const SiteHeader = () => {
  return (
    <div className="sticky top-0 py-2 bg-white z-50 shadow">
      <Container>
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-2">
            <Logo />
          </div>
          <div className="col-span-8 flex flex-row items-center justify-center gap-10">
            {homeRoutes.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="NavLink"
                color="gray"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="col-span-2 flex flex-row justify-end items-center">
            <Button size={"3"}>Subscription</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default memo(SiteHeader);
