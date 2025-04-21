import React, { memo } from "react";
import Container from "../Container";
import { Flex, Heading, Text } from "@radix-ui/themes";
import Card from "./Card";
import { valuesCards } from "@/config/dummy";

const WhatDrives = () => {
  return (
    <Container>
      <Flex direction={"column"} gap={"4"} align={"center"}>
        <Heading size={"8"} className=" text-center">
          What Drives Us
        </Heading>
        <Text size={"4"} className=" text-center lg:w-[60%]">
          Core principles that shape our platform and your experience
        </Text>
      </Flex>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-20 gap-8 items-center">
        {valuesCards.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    </Container>
  );
};

export default memo(WhatDrives);
