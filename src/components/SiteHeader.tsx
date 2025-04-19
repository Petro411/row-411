import React, { memo, useState } from "react";
import Logo from "./Logo";
import Container from "./Container";
import { homeRoutes } from "@/config/HomeRoutes";
import { Button, Text } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { TextAlignRightIcon } from "@radix-ui/react-icons";
import Sidebar from "./Sidebar";
import Link from "next/link";

const SiteHeader = () => {
  const [visible, setVisible] = useState(false);
  const pathname = useRouter().pathname;
  const toggleSidebar = () => setVisible(!visible);
  return (
    <>
      <div className="sticky top-0 py-2 bg-white z-50 shadow">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-12 items-center">
            <div className=" lg:col-span-2">
              <Logo />
            </div>
            <div className="hidden lg:col-span-8 lg:flex flex-row items-center justify-center gap-10">
              {homeRoutes.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className={`${
                    pathname === item.path
                      ? "!text-btnPrimary font-medium"
                      : "!text-gray-500"
                  }`}
                  // underline={pathname === item.path ? "always" : "hover"}
                >
                  <Text size={"3"}>{item.name}</Text>
                </Link>
              ))}
            </div>
            <div className="lg:col-span-2 flex flex-row justify-end items-center gap-4">
              <Button
                size={"3"}
                className="!bg-btnPrimary !cursor-pointer !border border-btnPrimary"
              >
                Login
              </Button>
              <Button
                size={"3"}
                className="!hidden lg:!block !bg-transparent !cursor-pointer !border !border-btnPrimary !transition-all !duration-300 !text-btnPrimary hover:!bg-btnPrimary hover:!text-white"
                variant="outline"
                color="cyan"
              >
                Sign Up
              </Button>

              <Button
                onClick={toggleSidebar}
                size={"3"}
                className="!block lg:!hidden !bg-transparent !cursor-pointer !border !border-btnPrimary !transition-all !duration-300 !text-btnPrimary hover:!bg-btnPrimary hover:!text-white"
                variant="outline"
                color="cyan"
              >
                <TextAlignRightIcon height={25} width={25} />
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <Sidebar visible={visible} setVisible={setVisible} />
    </>
  );
};

export default memo(SiteHeader);
