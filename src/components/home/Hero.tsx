import React, { memo } from "react";
import Container from "../Container";
import { Heading, Text } from "@radix-ui/themes";

const Hero = () => {
  return (
    <div className={`h-[60vh] bg-primary HomeBackground text-white`}>
      <Container className="h-full items-center justify-center flex flex-col text-center gap-4">
        <Heading size={"9"}>Lorem ipsum dolor.</Heading>
        <Text size={"4"} className="w-full md:w-[80%] lg:w-[60%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          exercitationem autem voluptate officia eius corrupti perferendis totam
          obcaecati similique dolorum.
        </Text>
      </Container>
    </div>
  );
};

export default memo(Hero);
