import AuthLayout from "@/components/auth/AuthLayout";
import ThirdPartyAuthButton from "@/components/ThirdPartyAuthButton";
import Label from "@/config/Label";
import { useMutation } from "@/hooks/useMutation";
import { endpoints } from "@/services/api";
import GetApiErrorMessage from "@/utils/GetApiErrorMessage";
import { setItem } from "@/utils/Localstorage";
import withApp from "@/utils/withApp";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Button, Flex, Separator, Text, TextField } from "@radix-ui/themes";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-simple-toasts";
import GoogleAuth from "@/components/auth/GoogleAuth";

const Login = () => {
  const router = useRouter();
  const { request, loading } = useMutation(endpoints.login);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [secureText, setSecureText] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((pre) => ({ ...pre, [name]: value }));
  };


  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const res = await request(form);
      setItem("token", res.token);
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      toast(GetApiErrorMessage(error));
    }
  };

  useEffect(() => {
    router.prefetch("/dashboard");
  }, []);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <AuthLayout title={Label.Login}>
        <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
          <TextField.Root
            placeholder={Label.EmailAddress}
            name="email"
            value={form.email}
            onChange={handleOnChange}
            required={true}
            radius="large"
            inputMode="email"
            type="email"
          />
          <TextField.Root
            placeholder={Label.Password}
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
          <Link href={"/auth/forget-password"} className="text-end">
            <Text
              size={"2"}
              className="!text-primary underline"
              align={"right"}
            >
              {Label.ForgetPassword}
            </Text>
          </Link>
          <Button
            className="!mt-2 !bg-btnPrimary hover:!bg-btnHover"
            size={"4"}
            type="submit"
            disabled={loading}
            loading={loading}
          >
            <Text className="!text-white" size={"3"}>
              {Label.Login}
            </Text>
          </Button>
        </form>
        <Flex direction={"row"} align={"center"} gap={"5"} py={"6"}>
          <Separator size={"4"} />
          <Text>OR</Text>
          <Separator size={"4"} />
        </Flex>

        <Flex className="flex flex-col xl:flex-row xl:items-center" gap={"3"}>
          <GoogleAuth title={Label.LoginWithGoogle} />
          <ThirdPartyAuthButton
            title={Label.LoginWithFacebook}
            image="/assets/images/facebook.png"
          />
        </Flex>

        <Flex direction={"row"} align={"center"} justify={"center"} pt={"5"}>
          <Text size={"3"} color="gray">
            {Label.DontHaveAccount}{" "}
            <Link href={"/auth/sign-up"} className="text-primary underline">
              {Label.SignUp}
            </Link>
          </Text>
        </Flex>
      </AuthLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return withApp(context);
};

export default Login;
