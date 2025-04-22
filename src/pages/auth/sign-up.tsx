import Container from "@/components/Container";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import SiteHeader from "@/components/SiteHeader";
import ThirdPartyAuthButton from "@/components/ThirdPartyAuthButton";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Button,
  Flex,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import Head from "next/head";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";

const SignUp = () => {
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

  const handleSubmit = (e:any)=>{
    try {
      e.preventDefault();
      console.log(form)
    } catch (error) {
      
    }
  }

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
        className="!min-h-[40vh]" containerClassname="!min-h-[40vh]"
        // description='Get access to all the public data updates and personal benefits.'
      />

      <Container>
        <div className="-translate-y-[6rem] bg-white rounded-xl p-6 sm:p-10 w-full md:w-8/12 lg:w-5/12 mx-auto shadow-lg">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <TextField.Root
              placeholder="Name"
              required
              name="name"
              inputMode="text"
              value={form.name}
              onChange={handleOnChange}
              radius="large"
            />
            <TextField.Root
              placeholder="Email address"
              required
              type="email"
              inputMode="email"
              name="email"
              value={form.email}
              onChange={handleOnChange}
              radius="large"
            />
            <TextField.Root
              placeholder="Password"
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
