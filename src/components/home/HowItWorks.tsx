import { Flex, Heading, Text } from "@radix-ui/themes";
import React, { memo } from "react";

import Container from "../Container";


const cards = [
  {
    title: "Lorem ipsum dolor sit.",
    description: "Search individual or company mineral owners based on County & State Query (Map Search Option available)",
  },
  {
    title: "Lorem ipsum dolor sit.",
    description: "Download an entire County mineral owner listing - Each mineral owner listing will include name (Individual or Company), email (s), phone number (s), address, county, state and a short legal description.",
  },
  {
    title: "Lorem ipsum dolor sit.",
    description: "Download multiple Counties mineral owner listings",
  },
  {
    title: "Lorem ipsum dolor sit.",
    description: "Free searches without phone numbers and email addresses",
  },
]

const HowItWorks = () => {
  return (
    <div className="py-24 gradientBg flex flex-col justify-center">
      <Container className="flex flex-col items-center gap-14">
        <Flex direction={"column"} gap={"4"} align={"center"}>
          <Heading size={"8"} className="text-white text-center">
            How it works?
          </Heading>
          <Text size={"3"} className="text-white text-center lg:w-[60%]">
            Petro411, LLC is the first mineral owner database to utilize government property records from
specific oil and gas Counties and merge them with current phone numbers and emails.
          </Text>
        </Flex>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full gap-12">
          {cards.map((item, index) => (
            <Flex
              direction={"column"}
              gap={"4"}
              key={index}
              className="p-8 2xl:p-12 rounded-xl bg-gray-700/50 text-white !relative min-h-52"
              position={"relative"}
              align={"center"}
              justify={"center"}
            >
              <span className="text-primary opacity-60 text-7xl 2xl:text-9xl font-bold absolute top-3 left-3">{index + 1}</span>

              {/* <Heading size={"5"} className="!relative !z-10">Lorem ipsum dolor sit.</Heading> */}
              <Text className="!z-10 !text-white" size={"3"} weight={"medium"} >
                {item.description}
              </Text>
            </Flex>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default memo(HowItWorks);
