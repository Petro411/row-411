import { Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import React, { memo } from "react";

type Props = {
  image?: string;
  title?: string;
  description?: string;
};

const Card = ({ image, title, description }: Props) => {
  return (
    <div className="border p-6 2xl:p-8 rounded-xl flex flex-col gap-5 hover:border-primary transition-all duration-300">
      <div className="">
        <Image alt="" src={image ?? ""} height={50} width={50} />
      </div>
      <Flex direction={"column"} gap={"1"}>
        <Heading size={"4"} className="text-heading">{title}</Heading>
        <Text size={"3"} color="gray">
          {description}
        </Text>
      </Flex>
    </div>
  );
};

export default memo(Card);
