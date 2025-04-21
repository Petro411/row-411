import { Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import React, { memo } from "react";
import Container from "./Container";

const NewsLetter = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 HomeBackground bg-primary rounded-xl gap-12 2xl:gap-0 overflow-hidden border items-center">
        <div className="flex flex-col gap-8 text-white p-8 sm:p-12 2xl:p-16">
          <Heading size={"8"}>Stay in the Loop</Heading>
          <Flex direction={"column"} gap={"4"}>
            <Text size={"4"}>
              Subscribe to our newsletter for the latest updates on mineral
              ownership data, new county releases, platform features, and
              exclusive offers — delivered straight to your inbox.
            </Text>
          </Flex>
          <form className="flex flex-col gap-5 2xl:w-[70%] newsLetterFrom">
                <TextField.Root size={"3"} className="!bg-white"  placeholder="Your name" />
                <TextField.Root size={"3"} className="!bg-white"  placeholder="Email address" />
                <Button  className="!self-start !mt-5 !bg-white !cursor-pointer !text-primary hover:!bg-btnHover group" size={"4"}>
                  <Text size={"3"} className="group-hover:!text-white">Submit</Text>
                </Button>
            </form>
        </div>
        <div className={`h-full`}>
           <Image src={"/assets/images/newsletter.jpg"} alt="" className="h-full w-full object-cover"  height={400} width={400} />
        </div>
      </div>
    </Container>
  );
};

export default memo(NewsLetter);
