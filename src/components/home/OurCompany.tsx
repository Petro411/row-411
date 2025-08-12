import { Heading, Text } from "@radix-ui/themes";
import React, { memo } from "react";
import Image from "next/image";

import Container from "../Container";


const OurCompany = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        
        <div className="flex flex-col gap-4 order-1 lg:order-2">
          <Heading size={"8"} className="text-heading">
            Our Company
          </Heading>
          <div className="flex flex-col gap-4 mt-5">
            <Text size={"3"} color="gray">
              Petro411’s team has the required oil and gas and land experience
              to successfully execute and deliver a quality mineral owner
              database. With a combined experience of nearly 30 years that
              includes oil and gas, real estate titles, environmental,
              residential, commercial, land development and government.
            </Text>
          </div>
        </div>

        <div className="flex flex-row order-2 lg:order-1 justify-center lg:justify-start">
          <Image
            alt="alt"
            src={"/industries/land-8.png"}
            className="rounded-lg overflow-x-hidden"
            height={450}
            width={450}
          />
        </div>
      </div>
    </Container>
  );
};

export default memo(OurCompany);
