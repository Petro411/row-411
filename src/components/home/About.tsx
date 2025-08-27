import { Heading, Text } from "@radix-ui/themes";
import React, { memo } from "react";
import Image from "next/image";

import Container from "../Container";


const About = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="flex flex-col gap-4">
          <Heading size={"8"} className="text-heading">
            About Us
          </Heading>
          <div className="flex flex-col gap-4 mt-5">
            <Text size={"3"} color="gray">
              Petro411.com (or “Petro411”) aka “oil & gas white pages” seeks to develop an oil and gas
industry specific database to consolidate mineral owner contact and land data into one
system. The key to the system is to align the oil and gas industry with an industry-specific
phone data source, instead of continued use of the varied sources (i.e. Whitepages.com,
Beenverified, Spokeo, Intelius, LexisNexis, etc.…). 
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
