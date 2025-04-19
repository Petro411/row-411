import React from "react";
import Container from "../Container";
import { Typography } from "antd";
import Image from "next/image";

const { Title, Text } = Typography;

const About = () => {
  return (
    <Container>
      <div className="grid grid-cols-2">
        <div className="flex flex-col">
          <Title level={2}>About Us</Title>
          <div className="flex flex-col gap-4">
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Laudantium eligendi odit quos eius libero in nisi nobis velit rem
              a exercitationem earum vitae totam voluptas nulla, neque
              voluptates. Dignissimos, sint.
            </Text>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Laudantium eligendi odit quos eius libero in nisi nobis velit rem
              a exercitationem earum vitae totam voluptas nulla, neque
              voluptates. Dignissimos, sint.
            </Text>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <Image
            alt=""
            src={"/assets/images/empty-img.jpg"}
            height={600}
            width={600}
          />
        </div>
      </div>
    </Container>
  );
};

export default About;
