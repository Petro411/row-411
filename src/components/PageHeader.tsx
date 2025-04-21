import React, { memo } from "react";
import Container from "./Container";
import { Heading, Text } from "@radix-ui/themes";

type Props = {
  title?: string;
  description?: string;
  className?:string
};

const PageHeader = ({ title, description, className}: Props) => {
  return (
    <div className={`min-h-[40vh] bg-primary HomeBackground text-white ${className}`}>
      <Container className="min-h-[40vh] py-10 items-center justify-center flex flex-col text-center gap-4">
        <Heading size={"9"}>{title}</Heading>
        {description && (
          <Text size={"4"} className="w-full md:w-[80%] lg:w-[60%]">
            {description}
          </Text>
        )}
      </Container>
    </div>
  );
};

export default memo(PageHeader);
