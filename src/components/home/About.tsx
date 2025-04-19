import React, { memo } from "react";
import Container from "../Container";
import Image from "next/image";
import { Heading, Text } from "@radix-ui/themes";

const About = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="flex flex-col gap-4">
          <Heading size={"8"}>About Us</Heading>
          <div className="flex flex-col gap-4 mt-5">
            <Text size={"4"} color="gray">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Laudantium eligendi odit quos eius libero in nisi nobis velit rem
              a exercitationem earum vitae totam voluptas nulla, neque
              voluptates. Dignissimos, sint.
            </Text>
            <Text size={"4"} color="gray">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Laudantium eligendi odit quos eius libero in nisi nobis velit rem
              a exercitationem earum vitae totam voluptas nulla, neque
              voluptates. Dignissimos, sint.
            </Text>
          </div>
        </div>
        <div className="flex flex-row justify-center lg:justify-end">
          <Image
            alt=""
            src={"/assets/images/empty-img.jpg"}
            height={450}
            width={450}
          />
        </div>
      </div>
    </Container>
  );
};

export default memo(About);
