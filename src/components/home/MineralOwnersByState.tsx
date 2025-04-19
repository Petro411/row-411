import React, { memo } from "react";
import Container from "../Container";
import { statesList } from "@/config/dummy";
import Link from "next/link";
import { Flex, Heading, Text } from "@radix-ui/themes";

const MineralOwnersByState = () => {
  return (
    <Container>
      <Flex direction={"column"} gap={"5"}>
        <Flex direction={"column"} align={"center"} gap={"4"}>
          <Heading size={"8"} className="text-center">
            Mineral Owners by State
          </Heading>
          <Text
            size={"4"}
            color="gray"
            className="!w-full lg:!w-[70%] text-center"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
            dolorem ipsum voluptatem tempore reiciendis porro earum provident
            temporibus doloribus natus?
          </Text>
        </Flex>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-y-5 mt-8">
          {statesList.map((item, index) => (
            <li key={index} className="text-center 2xl:text-start">
              <Link href={"/"}>
                <Text size={"4"} color="cyan">
                  {item}
                </Text>
              </Link>
            </li>
          ))}
        </ul>
      </Flex>
    </Container>
  );
};

export default memo(MineralOwnersByState);
