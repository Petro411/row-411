import React from "react";
import { Typography } from "antd";
import Container from "../Container";
import { statesList } from "@/config/dummy";
import Link from "next/link";

const { Title, Text } = Typography;
const MineralOwnersByState = () => {
  return (
    <Container>
      <Title level={2}>Browse Mineral Owner Lists by State</Title>
      <Text className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit dolorem
        ipsum voluptatem tempore reiciendis porro earum provident temporibus
        doloribus natus?
      </Text>

      <ul className="grid grid-cols-6 gap-y-2 mt-8">
        {statesList.map((item, index) => (
          <li key={index}>
            <Link href={"/"}>
              <Text>{item}</Text>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default MineralOwnersByState;
