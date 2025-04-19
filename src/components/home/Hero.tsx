import React, { memo } from "react";
import Container from "../Container";
import { Heading, Text } from "@radix-ui/themes";

const Hero = () => {
  return (
    <div className={`h-[70vh] bg-primary HomeBackground text-white`}>
      <Container className="h-full">
        <div className="w-full md:w-[80%] 2xl:w-[50%] h-full flex flex-col justify-center gap-5">
          <Heading size={"9"}>
            Lorem ipsum dolor.
          </Heading>
          <Text size={"4"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            exercitationem autem voluptate officia eius corrupti perferendis
            totam obcaecati similique dolorum.
          </Text>
        </div>
      </Container>
    </div>
  );
};

export default memo(Hero);
