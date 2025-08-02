import { Text } from "@radix-ui/themes";
import React, { memo } from "react";
import Label from "@/config/Label";

import Container from "../Container";


const Hero = () => {
  return (
    <div className={`gradientBg text-white`}>
      <Container className="min-h-[60vh] items-center justify-center flex flex-col text-center gap-4">
        <h1 className="text-4xl md:text-5xl font-bold">{Label.YourMineralOwners}</h1>
        <Text size={"3"} className="w-full md:w-[80%] lg:w-[60%]">
          {Label.SimplifiesLandAcquisition}
        </Text>
      </Container>
    </div>
  );
};

export default memo(Hero);
