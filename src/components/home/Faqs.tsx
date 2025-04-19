import React, { memo } from "react";
import Container from "../Container";
import { ChevronDownIcon, Flex, Heading } from "@radix-ui/themes";
import * as Accordion from "@radix-ui/react-accordion";
import { faqs } from "@/config/dummy";

const Faqs = () => {
  return (
    <Container className="flex flex-col items-center gap-14 pb-20">
      <Flex direction={"column"} gap={"4"} align={"center"}>
        <Heading size={"8"} className="text-center">
          FAQ
        </Heading>
      </Flex>
      <Flex direction={"column"} className="w-full">
        <Accordion.Root type="single" collapsible className="w-full">
          {faqs.map((item, index) => (
            <Accordion.Item
              value={item.question}
              key={index}
              className="border-t py-4"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between text-left text-lg font-medium">
                  {item.question}
                  <ChevronDownIcon className="transition-transform duration-200 AccordionChevron" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="py-2 text-gray-600">
                {item.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Flex>
    </Container>
  );
};

export default memo(Faqs);
