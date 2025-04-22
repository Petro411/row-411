import React, { memo } from "react";
import Container from "./Container";
import { footerRoutes } from "@/config/FooterRoutes";
import { Text } from "@radix-ui/themes";
import Link from "next/link";

const Footer = () => {
  return (
    <>
    <div className="bg-primary">
      <Container>
        <div className="py-6 flex flex-col sm:flex-row items-center justify-center gap-10">
          {footerRoutes.map((item, index) => (
            <Link
              key={index}
              href={item.path}
            >
              <Text size={"3"} className="!text-white">{item.name}</Text>
            </Link>
          ))}
        </div>
      </Container>
    </div>
    <div className="bg-primary py-2 flex flex-row items-center justify-center">
      <Text className="!text-gray-200 px-6" align={"center"} >Copyright © 2025 petro411.com. All rights reserved.</Text>
    </div>
    </>

  );
};

export default memo(Footer);
