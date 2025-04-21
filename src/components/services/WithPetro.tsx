import React, { memo } from "react";
import Container from "../Container";
import { Flex, Heading, Text } from "@radix-ui/themes";
import MineralOwnerFilter from "../home/MineralOwnerFilter";

const WithPetro = () => {
  return (
    <div className="py-24 bg-primary flex flex-col gap-14">
      <Container>
        <Flex direction={"column"} gap={"4"} align={"center"}>
          <Heading size={"8"} className="text-white text-center">
            With Petro411
          </Heading>
          <Text size={"4"} className="text-white text-center lg:w-[60%]">
            Quickly find mineral owners and property details—just enter your
            criteria and get results instantly with Petro411.
          </Text>
        </Flex>
      </Container>

      <MineralOwnerFilter
        formClassName="lg:flex-col"
        className="w-full sm:w-10/12 lg:w-5/12 mx-auto p-10 md:py-10"
      />
      <Container>
        <Heading size={"6"} className="text-white text-center">
          Find the mineral data you need—faster and smarter.
        </Heading>
      </Container>
    </div>
  );
};

export default memo(WithPetro);
