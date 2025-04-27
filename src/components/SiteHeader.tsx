import React, { memo, useState } from "react";
import Logo from "./Logo";
import Container from "./Container";
import { homeRoutes } from "@/config/HomeRoutes";
import { Button, Separator, Text } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { ArrowRightIcon, TextAlignRightIcon } from "@radix-ui/react-icons";
import Sidebar from "./Sidebar";
import Link from "next/link";

type Props = {
  hideNavigation?: boolean;
  className?: string;
};

const SiteHeader = ({ hideNavigation = false, className }: Props) => {
  const [visible, setVisible] = useState(false);
  const pathname = useRouter().pathname;
  const toggleSidebar = () => setVisible(!visible);
  return (
    <>
      <div className={`sticky top-0 py-3 bg-white z-50 shadow ${className}`}>
        <Container>
          <div className="grid  grid-cols-2 lg:grid-cols-12 items-center">
            <div className=" lg:col-span-2">
              <Logo />
            </div>
            {!hideNavigation && (
              <>
                <div className="hidden lg:col-span-8 lg:flex flex-row items-center justify-center gap-10">
                  {homeRoutes.map((item, index) => (
                    <Link
                      key={index}
                      href={item.path}
                      className={`
                        hover:text-yellow
                        ${
                        pathname === item.path
                          ? "text-yellow font-medium"
                          : "text-gray-500"
                      }` }
                    >
                      <Text size={"3"}>{item.name}</Text>
                    </Link>
                  ))}
                </div>
                <div className="lg:col-span-2 flex flex-row justify-end items-center gap-4">
                  <Link
                    href={"/auth/sign-up"}
                    className="rounded-lg !bg-yellow !cursor-pointer !border !border-btnPrimary rt-BaseButton rt-Button rt-r-size-3 py-1.5"
                  >
                    <Text size={"2"} className="!text-white ">
                      Get Started
                    </Text>
                  </Link>
                  <Link href={"/auth/login"} className="flex flex-row items-center gap-2 border-2 border-btnPrimary hover:bg-btnPrimary group py-1.5 rt-r-size-3 rt-BaseButton rt-Button">
                  <Text size={"2"} className="group-hover:!text-white">Login</Text>
                  <ArrowRightIcon height={18} width={18} className="group-hover:!text-white" />
                  </Link>

                  <Button
                    onClick={toggleSidebar}
                    size={"2"}
                    className="!block lg:!hidden !bg-transparent !cursor-pointer !border !border-btnPrimary !transition-all !duration-300 !text-btnPrimary hover:!bg-btnPrimary hover:!text-white"
                    variant="outline"
                  >
                    <TextAlignRightIcon height={25} width={25} />
                  </Button>
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
      <Sidebar visible={visible} setVisible={setVisible} />
    </>
  );
};

export default memo(SiteHeader);
 