import Container from "@/components/Container";
import ThirdPartyAuthButton from "@/components/ThirdPartyAuthButton";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [secureText, setSecureText] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container className="z-50 flex flex-col min-h-screen justify-center">
        <div className="bg-white rounded-xl p-6 sm:p-10 w-full sm:w-10/12 md:w-8/12 lg:w-5/12 mx-auto shadow-lg">
        <Heading size={"7"}>Login</Heading>
          <form className="flex flex-col gap-5 mt-5">
            <TextField.Root
              placeholder="Email address"
              name="email"
              value={form.email}
              onChange={handleOnChange}
              required={true}
              radius="large"
              inputMode="email"
              type="email"
            />
            <TextField.Root
              placeholder="Password"
              radius="large"
              className="!flex-row-reverse passwordInput"
              name="password"
              inputMode="text"
              value={form.password}
              onChange={handleOnChange}
              required={true}
              type={secureText ? "password" : "text"}
            >
              <TextField.Slot onClick={() => setSecureText(!secureText)}>
                {secureText ? (
                  <EyeOpenIcon
                    height={"20"}
                    width={"20"}
                    className="!cursor-pointer"
                  />
                ) : (
                  <EyeClosedIcon
                    height={"20"}
                    width={"20"}
                    className="!cursor-pointer"
                  />
                )}
              </TextField.Slot>
            </TextField.Root>
              <Link href={"/forget-password"} className="text-end">
                <Text size={"2"} className="!text-primary underline" align={"right"}>
                  Forget password?
                </Text>
              </Link>
            <Button className="!mt-2 !bg-btnPrimary hover:!bg-btnHover" size={"4"}>
              <Text className="!text-white" size={"3"}>
                Login
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
              title="Login with Google"
              image="/assets/images/google.png"
            />
            <ThirdPartyAuthButton
              title="Login with Facebook"
              image="/assets/images/facebook.png"
            />
          </Flex>

          <Flex direction={"row"} align={"center"} justify={"center"} pt={"5"}>
            <Text size={"3"} color="gray">
              Don't have an account?{" "}
              <Link href={"/auth/sign-up"} className="text-primary underline">
                Sign up
              </Link>
            </Text>
          </Flex>
        </div>
      </Container>
      <div className="gradientBg fixed top-0 left-0 w-full h-1/2 -z-10"></div>
    </>
  );
};

export default Login;
