import AuthLayout from "@/components/auth/AuthLayout";
import ThirdPartyAuthButton from "@/components/ThirdPartyAuthButton";
import Label from "@/config/Label";
import { useMutation } from "@/hooks/useMutation";
import { endpoints } from "@/services/api";
import GetApiErrorMessage from "@/utils/GetApiErrorMessage";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Button,
  Flex,
  Heading,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import Head from "next/head";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import toast from "react-simple-toasts";

const SignUp = () => {
  const { request, loading } = useMutation(endpoints.signup);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [secureText, setSecureText] = useState(false);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLButtonElement>
  ) => {
    const { value, name } = e.target;
    setForm((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const res = await request(form);
      console.log(res);
    } catch (error: any) {
      toast(GetApiErrorMessage(error));
    }
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <AuthLayout title={Label.SignUp}>
        <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
          <TextField.Root
            placeholder={Label.Name}
            required
            name="name"
            inputMode="text"
            value={form.name}
            onChange={handleOnChange}
            radius="large"
          />
          <TextField.Root
            placeholder={Label.EmailAddress}
            required
            type="email"
            inputMode="email"
            name="email"
            value={form.email}
            onChange={handleOnChange}
            radius="large"
          />
          <TextField.Root
            placeholder={Label.Password}
            required
            radius="large"
            inputMode="text"
            className="!flex-row-reverse passwordInput"
            name="password"
            type={secureText ? "password" : "text"}
            value={form.password}
            onChange={handleOnChange}
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

          <Button
            className="!mt-5 !bg-btnPrimary"
            size={"4"}
            disabled={loading}
            loading={loading}
          >
            <Text className="!text-white" size={"3"}>
              {Label.SignUp}
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
            title={Label.SignUpWithGoogle}
            image="/assets/images/google.png"
          />
          <ThirdPartyAuthButton
            title={Label.SignUpWithFacebook}
            image="/assets/images/facebook.png"
          />
        </Flex>

        <Flex direction={"row"} align={"center"} justify={"center"} pt={"5"}>
          <Text size={"3"} color="gray">
            {Label.AlreadyHaveAccount}{" "}
            <Link href={"/auth/login"} className="text-primary underline">
              {Label.Login}
            </Link>
          </Text>
        </Flex>
      </AuthLayout>
    </>
  );
};

export default SignUp;
