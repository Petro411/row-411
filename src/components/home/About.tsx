import { Heading, Text } from "@radix-ui/themes";
import React, { memo } from "react";
import { label } from "@/branding";
import Image from "next/image";

import Container from "../Container";


const About = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="flex flex-col gap-4">
          <Heading size={"8"} className="text-heading">
            {label.AboutUs}
          </Heading>
          <div className="flex flex-col gap-4 mt-5">
            <Text size={"3"} color="gray">
               {label.AboutUsDes}
            </Text>
          </div>
        </div>
        <div className="flex flex-row justify-center lg:justify-end">
          <Image
            alt=""
            src={"/industries/land-9.png"}
            className="rounded-lg overflow-x-hidden"
            height={450}
            width={450}
          />
        </div>
      </div>
    </Container>
  );
};

export default memo(About);
