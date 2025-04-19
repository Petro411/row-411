import React, { memo } from "react";
import Container from "../Container";
// import { Typography } from "antd";
import Image from "next/image";
import { Heading, Text } from "@radix-ui/themes";

// const { Title, Text} = Typography;

const OurCompany = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="flex flex-row order-2 lg:order-1 justify-center lg:justify-start">
          <Image
            alt=""
            src={"/assets/images/empty-img.jpg"}
            height={450}
            width={450}
          />
        </div>
        <div className="flex flex-col gap-4 order-1 lg:order-2">
          <Heading size={"8"}>Our Company</Heading>
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
      </div>
    </Container>
  );
};

export default memo(OurCompany);
