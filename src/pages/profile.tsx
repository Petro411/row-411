import { Avatar, Button, Flex, Separator, Text } from "@radix-ui/themes";
import Subscription from "@/components/dashboard/Subscription";
import GetApiErrorMessage from "@/utils/GetApiErrorMessage";
import { deleteItem } from "@/utils/Localstorage";
import SiteHeader from "@/components/SiteHeader";
import { getUser } from "@/context/AuthContext";
import Container from "@/components/Container";
import { GetServerSideProps } from "next";
import withAuth from "@/utils/withAuth";
import toast from "react-simple-toasts";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import Head from "next/head";
import React from "react";


const Dashboard = ({ user }: any) => {
  const router = useRouter();
  const userContext = getUser();

  const handleLogout = async () => {
    try {
      // await baseApi.get(endpoints.logout);
      destroyCookie(null, 'token', { path: '/' });
      deleteItem("token");
      router.push("/auth/login");
      userContext?.setUser(null);
      toast("You have been logged out.");
    } catch (error) {
      toast(GetApiErrorMessage(error));
    }
  };
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <SiteHeader />
      <Container className="lg:w-8/12 mx-auto">
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          mt={"8"}
          mb={"6"}
        >
          <Avatar
            radius="full"
            src={user?.picture}
            fallback={user?.name[0]?.toUpperCase() ?? "U"}
            title={user?.name}
            size="8"
          />
          <Flex direction={"column"} mt={"2"} align={"center"}>
            <Text size={"4"}>{user?.name}</Text>
            <Text size={"2"} color="gray">
              {user?.email}
            </Text>
          </Flex>
          <Button
            onClick={handleLogout}
            mt={"4"}
            size="2"
            color="red"
            variant="outline"
          >
            Logout
          </Button>
        </Flex>
        <Separator orientation={"horizontal"} size={"4"} />
        <Subscription />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return withAuth(context);
};

export default Dashboard;
