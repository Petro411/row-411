import React, { memo } from "react";
import Container from "./Container";
import { Heading, Text } from "@radix-ui/themes";

type Props = {
  title?: string;
  description?: string;
  className?:string;
  containerClassname?:string
};

const PageHeader = ({ title, description, className, containerClassname}: Props) => {
  return (
    <div className={`min-h-[60vh] md:min-h-[40vh] gradientBg text-white ${className}`}>
      <Container className={`min-h-[60vh] md:min-h-[50vh] py-10 items-center justify-center flex flex-col text-center gap-4 ${containerClassname}`}>
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        {description && (
          <Text size={"3"} className="w-full md:w-[80%] lg:w-[60%]">
            {description}
          </Text>
        )}
      </Container>
    </div>
  );
};

export default memo(PageHeader);
