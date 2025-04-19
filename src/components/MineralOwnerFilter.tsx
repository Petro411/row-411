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
        gap={"middle"}
        >
          <Input placeholder="First name" size="large" />
          <Input placeholder="Last name" size="large" />
          <InputNumber placeholder="ML" size="large" width={"100"}/>
          <Select
            size="large"
            defaultValue="lucy"
            style={{ width: 120 }}
            //   onChange={handleChange}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
          <Button type="primary" size="large">
            Search
          </Button>
        </Flex>
      </div>
    </Container>
  );
};

export default MineralOwnerFilter;
