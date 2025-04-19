import React, { memo } from "react";
import {
  Button,
  Flex,
  Heading,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import Container from "../Container";

const MineralOwnerFilter = () => {
  return (
    <Container>
      <div className="md:-translate-y-24 rounded md:shadow-xl bg-white py-20 md:p-10 flex flex-col gap-6">
        <Flex direction={"column"} gap={"1"}>
          <Heading size={"6"}>Search Mineral Owners</Heading>
          <Text color="gray">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias a
            culpa itaque libero consequatur expedita, saepe ratione at non ex.
          </Text>
        </Flex>
        <Flex className="gap-4 lg:gap-8 flex-col lg:flex-row">
          <TextField.Root size={"3"} className="w-full" placeholder="First name" color="gray" variant="soft" />
          <TextField.Root size={"3"} className="w-full" placeholder="Last name" color="gray" variant="soft" />
          <TextField.Root size={"3"} className="w-full" placeholder="ML"  color="gray" variant="soft" />

          <Select.Root defaultValue="apple" size={"3"} >
            <Select.Trigger variant="soft"  color="gray" className=""   />
            <Select.Content>
              <Select.Group>
                <Select.Label>Fruits</Select.Label>
                <Select.Item value="orange">Orange</Select.Item>
                <Select.Item value="apple">Apple</Select.Item>
                <Select.Item value="grape" disabled>
                  Grape
                </Select.Item>
              </Select.Group>
              <Select.Separator />
              <Select.Group>
                <Select.Label>Vegetables</Select.Label>
                <Select.Item value="carrot">Carrot</Select.Item>
                <Select.Item value="potato">Potato</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <Button size={"3"} className="!bg-btnPrimary !cursor-pointer">Search</Button>
        </Flex>
      </div>
    </Container>
  );
};

export default memo(MineralOwnerFilter);
