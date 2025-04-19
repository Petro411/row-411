import React from "react";
import Container from "./Container";
import { Button, Flex, Input, InputNumber, Select, Typography } from "antd";

const { Title } = Typography;

const MineralOwnerFilter = () => {
  return (
    <Container>
      <div className="min-h-[200px] -translate-y-24 rounded shadow-xl bg-white p-10 flex flex-col gap-2">
        <Title level={3}>Search Mineral Owners</Title>
        <Flex
        className="gap-8"
        >
        <input className="py-3 px-4 bg-gray-100 outline-none rounded text-gray-500 w-full" placeholder="First name" />
        <input className="py-3 px-4 bg-gray-100 outline-none rounded text-gray-500 w-full" placeholder="Last name" />
        <input 
        type="number"
        className="py-3 px-4 bg-gray-100 outline-none rounded text-gray-500 w-full" placeholder="ML" />
        <select className="py-3 px-4 bg-gray-100 outline-none rounded text-gray-500">
          <option value="Country">Country</option>
          <option value="Country">Country</option>
          <option value="Country">Country</option>
          <option value="Country">Country</option>
          <option value="Country">Country</option>

        </select>
          <Button type="primary" size="large" className="!py-3">

            Search
          </Button>
        </Flex>
      </div>
    </Container>
  );
};

export default MineralOwnerFilter;
