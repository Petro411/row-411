import React from "react";
import Container from "../Container";
import { Typography } from "antd";
import Image from "next/image";

const { Title, Text} = Typography;

const OurCompany = () => {
  return (
    <Container>
      <div className="grid grid-cols-2">
        <div className="flex flex-row justify-start">
          <Image
            alt=""
            src={"/assets/images/empty-img.jpg"}
            height={600}
            width={600}
          />
        </div>
        <div className="">
          <Title level={2}>Our Company</Title>
          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium
            eligendi odit quos eius libero in nisi nobis velit rem a
            exercitationem earum vitae totam voluptas nulla, neque voluptates.
            Dignissimos, sint.
          </Text>
        </div>
      </div>
    </Container>
  );
};

export default OurCompany;
