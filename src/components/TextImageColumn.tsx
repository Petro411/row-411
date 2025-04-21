import React, { memo, ReactNode } from "react";
import Container from "./Container";
import { Heading, Text } from "@radix-ui/themes";
import Image from "next/image";

const imageFirstClassName = "lg:order-1 order-2";

type Props = {
  title?: string;
  text1?: string;
  text2?: string;
  children?: ReactNode;
  image?: string;
  imageFirst?: boolean;
};

const TextImageColumn = ({
  title,
  text1,
  text2,
  children,
  image,
  imageFirst,
}: Props) => {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div
          className={`flex flex-col gap-4 ${
            imageFirst ? "lg:order-2 order-1" : ""
          }`}
        >
          <Heading size={"8"}>{title}</Heading>
          <div className="flex flex-col gap-4 mt-5">
            {children ? (
              children
            ) : (
              <>
                {text1 && (
                  <Text size={"4"} color="gray">
                    {text1}
                  </Text>
                )}
                {text2 && (
                  <Text size={"4"} color="gray">
                    {text2}
                  </Text>
                )}
              </>
            )}
          </div>
        </div>
        <div
          className={`flex flex-row justify-center ${
            imageFirst ? "lg:order-1 order-2 lg:justify-start" : "lg:justify-end"
          }`}
        >
          <Image
            alt=""
            src={image ? image : "/assets/images/empty-img.jpg"}
            height={450}
            width={450}
          />
        </div>
      </div>
    </Container>
  );
};

export default memo(TextImageColumn);
