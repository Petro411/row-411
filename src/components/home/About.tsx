import React, { memo } from "react";
import Container from "../Container";
import Image from "next/image";
import { Heading, Text } from "@radix-ui/themes";

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
              Petro411.com is a web based technology product developed for the
              oil and gas industry. In particular, for the Landmen who work
              countless hours looking up phone numbers to contact mineral owners
              for a multitude of land acquisition purposes.
            </Text>
            <Text size={"3"} color="gray">
              Petro411 is being developed as the "white pages" for the oil and
              gas industry land acquisition process, and to provide a
              centralized resource to obtain key contact information for mineral
              owners throughout the U.S.
            </Text>
          </div>
        </div>
        <div className="flex flex-row justify-center lg:justify-end">
          <Image
            alt=""
            src={"/assets/images/empty-img.jpg"}
            height={450}
            width={450}
          />
        </div>
      </div>
    </Container>
  );
};

export default memo(About);
