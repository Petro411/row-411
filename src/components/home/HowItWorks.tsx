import React, { memo } from "react";
import Container from "../Container";
import { Flex, Heading, Text } from "@radix-ui/themes";

const HowItWorks = () => {
  return (
    <div className="py-24 gradientBg flex flex-col justify-center">
      <Container className="flex flex-col items-center gap-14">
        <Flex direction={"column"} gap={"4"} align={"center"}>
          <Heading size={"8"} className="text-white text-center">
            How it works?
          </Heading>
          <Text size={"3"} className="text-white text-center lg:w-[60%]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium
            eligendi odit quos eius libero in nisi nobis velit rem a
            exercitationem earum vitae totam voluptas nulla, neque voluptates.
            Dignissimos, sint.
          </Text>
        </Flex>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full gap-12">
          {["", "", ""].map((item, index) => (
            <Flex
              direction={"column"}
              gap={"4"}
              key={index}
              className="p-8 2xl:p-12 rounded-xl bg-gray-700/50 text-white !relative"
              position={"relative"}
            >
              <span className="text-primary text-9xl font-bold absolute top-3 left-3">{index + 1}</span>

              <Heading size={"5"} className="!relative !z-10">Lorem ipsum dolor sit.</Heading>
              <Text className="!z-10" size={"2"}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Corporis, ipsum culpa? Nisi omnis eum ullam magnam quo tempora
                iste. Aliquam.
              </Text>
            </Flex>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default memo(HowItWorks);
