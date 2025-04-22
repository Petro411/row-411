import React, { memo } from "react";
import {
  Button,
  DropdownMenu,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import Container from "../Container";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { cityStatesList } from "@/config/dummy";

type Props = {
  title?: string;
  paragraph?: string;
  className?: string;
  formClassName?: string;
  dropDownClasses?:string
};

const MineralOwnerFilter = ({
  title,
  paragraph,
  className,
  formClassName,
  dropDownClasses
}: Props) => {
  return (
    <Container>
      <div
        className={`rounded-xl md:shadow-xl bg-white md:py-10 md:p-10 flex flex-col gap-6 ${className}`}
      >
        {title || paragraph ? (
          <Flex direction={"column"} gap={"1"}>
            {title && <Heading size={"6"}>{title}</Heading>}
            {paragraph && <Text color="gray">{paragraph}</Text>}
          </Flex>
        ) : (
          ""
        )}
        <Flex
          className={`gap-4 lg:gap-8 flex-col lg:flex-row ${formClassName}`}
        >
          <TextField.Root
            size={"3"}
            className="w-full"
            placeholder="First name"
          />
          <TextField.Root
            size={"3"}
            className="w-full"
            placeholder="Last name"
          />
          <TextField.Root size={"3"} className="w-full" placeholder="ML" />
          <Flex className={`${dropDownClasses}`}>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="!w-full">
                <Button
                  size={"4"}
                  className="!bg-transparent !text-black !flex !flex-row items-center !justify-between"
                  variant="outline"
                  color="gray"
                >
                  <Text
                    align={"left"}
                    size={"3"}
                    color="gray"
                    aria-multiline={false}
                    className="!font-normal w-full lg:!w-[100px] text-nowrap overflow-hidden"
                  >
                    City/State
                  </Text>
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="max-w-[400px] min-w-[280px] p-3">
                <TextField.Root
                  inputMode="search"
                  placeholder="Search"
                  size={"2"}
                  className="!rounded-lg !mb-3"
                >
                  <TextField.Slot>
                    <MagnifyingGlassIcon height="18" width="18" />
                  </TextField.Slot>
                </TextField.Root>
                <Flex
                  maxHeight={"200px"}
                  overflowY={"auto"}
                  direction={"column"}
                >
                  {cityStatesList.map((item, index) => {
                    const isSelected = false;
                    return (
                      <DropdownMenu.Item
                        key={index}
                        className={`!py-5 group ${
                          isSelected ? "!bg-primary" : "!bg-transparent"
                        } hover:!bg-primary`}
                      >
                        <Text
                          color="gray"
                          size={"3"}
                          className={`${
                            isSelected ? "!text-white" : "!text-black"
                          } group-hover:!text-white`}
                        >
                          {item}
                        </Text>
                      </DropdownMenu.Item>
                    );
                  })}
                </Flex>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>

          <Button size={"4"} className="!bg-btnPrimary !cursor-pointer">
            <Text  size={"3"}>
            Search
            </Text>
          </Button>
        </Flex>
      </div>
    </Container>
  );
};

export default memo(MineralOwnerFilter);
