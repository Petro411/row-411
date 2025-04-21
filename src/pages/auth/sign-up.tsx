import Container from "@/components/Container";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import SiteHeader from "@/components/SiteHeader";
import ThirdPartyAuthButton from "@/components/ThirdPartyAuthButton";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Button,
  Checkbox,
  Flex,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <SiteHeader
        className="!shadow-none !absolute !bg-transparent !w-full"
        hideNavigation={true}
      />
      <PageHeader
        title="Sign Up"
        // description='Get access to all the public data updates and personal benefits.'
      />

      <Container>
        <div className="-translate-y-16 bg-white rounded-xl p-10 w-full md:w-8/12 lg:w-5/12 mx-auto shadow-lg">
          <form className="flex flex-col gap-5">
            <TextField.Root placeholder="Name" radius="large" />
            <TextField.Root placeholder="Email address" radius="large" />
            <TextField.Root
              placeholder="Password"
              radius="large"
              className="!flex-row-reverse passwordInput"
            >
              <TextField.Slot>
                {/* <EyeOpenIcon height={"20"} width={"20"} className='!cursor-pointer' /> */}
                <EyeClosedIcon
                  height={"20"}
                  width={"20"}
                  className="!cursor-pointer"
                />
              </TextField.Slot>
            </TextField.Root>
            <Flex direction={"row"} align={"center"} justify={"between"}>
              <Flex gap="2" align={"center"}>
                <Checkbox defaultChecked />
                <Text size={"3"} color="gray">
                  Remember me
                </Text>
              </Flex>
            </Flex>
            <Button className="!mt-5" size={"4"}>
              <Text className="!text-white" size={"3"}>
                Sign up
              </Text>
            </Button>
          </form>
          <Flex direction={"row"} align={"center"} gap={"5"} py={"6"}>
            <Separator size={"4"} />
            <Text>OR</Text>
            <Separator size={"4"} />
          </Flex>

          <Flex className="flex flex-col xl:flex-row xl:items-center" gap={"3"}>
            <ThirdPartyAuthButton
              title="Sign up with Google"
              image="/assets/images/google.png"
            />
            <ThirdPartyAuthButton
              title="Sign up with Facebook"
              image="/assets/images/facebook.png"
            />
          </Flex>

          <Flex direction={"row"} align={"center"} justify={"center"} pt={"5"}>
            <Text size={"3"} color="gray">
              Already have an account?{" "}
              <Link href={"/auth/login"} className="text-primary underline">
                Login
              </Link>
            </Text>
          </Flex>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default SignUp;
