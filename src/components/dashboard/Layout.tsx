import React, { memo, ReactNode, useMemo } from "react";
import SiteHeader from "../SiteHeader";
import Container from "../Container";
import { Avatar, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { getUser } from "@/context/AuthContext";
import { useRouter } from "next/router";
import {DashboardRoutes} from "@/config/DashboardRoutes";
import Link from "next/link";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  const user = getUser()?.user ?? null;
  const router = useRouter();
  const activePath = router.pathname;
  const activeTabTitle = useMemo(()=>{
    return DashboardRoutes.find((item)=>item.path === activePath)?.title ?? ""
  },[activePath])
  return (
    <>
      <SiteHeader />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 mt-8 gap-10">
          <div className="!hidden lg:!block overflow-hidden lg:col-span-4 xl:col-span-3 h-fit border rounded-xl sticky top-0">
            <Flex
              direction={"row"}
              align={"center"}
              gap={"3"}
              py={"4"}
              px={"3"}
            >
              <Avatar
                size={"4"}
                radius="full"
                fallback={user?.name[0]?.toUpperCase() ?? "U"}
                title={user?.name}
              />
              <Flex direction={"column"}>
                <Text size={"3"} weight={"medium"}>
                  {user?.name}
                </Text>
                <Text size={"1"} className="line-clamp-1">
                  {user?.email}
                </Text>
              </Flex>
            </Flex>

            <Separator size={"4"} orientation={"horizontal"} />

            <Flex direction={"column"} py={"3"}>
                {
                    DashboardRoutes.map((tab,index)=>(
                        <Link href={tab.path} key={index} className={`flex flex-row items-center gap-3 py-3 px-3 border-l-[3px] transition-all duration-300  ${tab.path === activePath? 'border-primary text-primary' : 'border-transparent'} hover:!text-primary`}>
                            {tab.icon}
                            <Text size={"2"}>{tab.title}</Text>
                        </Link>
                    ))
                }
            </Flex>
          </div>
          <div className="lg:col-span-8 2xl:col-span-9 h-fit">
            <Heading size={"5"} mb={"2"}>{activeTabTitle}</Heading>
            {children}
            </div>
        </div>
      </Container>
    </>
  );
};

export default memo(Layout);
