import React from "react";
import Container from "../Container";
import { Typography } from "antd";
const { Title, Text } = Typography;

const HowItWorks = () => {
  return (
    <div className="min-h-[80vh] bg-blue-500 flex flex-col justify-center">
    <Container className="flex flex-col items-center">
      <Title level={2}>How it works?</Title>
      <Text className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit dolorem
        ipsum voluptatem tempore reiciendis porro earum provident temporibus
        doloribus natus?
      </Text>

      <div className="grid grid-cols-3 w-full">
        {
            ["","",""].map((item,index)=>(
                <div key={index} className="border rounded min-h-32"></div>
            ))
        }
      </div>
    </Container>
    </div>

  );
};

export default HowItWorks;
