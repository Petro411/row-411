import { Text } from "@radix-ui/themes";
import Image from "next/image";
import React, { memo } from "react";

type Props = {
  title?: string;
  image?: string;
  onClick?:()=>void;
};

const ThirdPartyAuthButton = ({ title, image, onClick}: Props) => {
  return (
    <button onClick={onClick} className="flex flex-row items-center justify-center flex-1 gap-2 2xl:gap-4 border py-3 rounded-lg px-1 2xl:px-3 hover:bg-gray-100">
      <Image alt="" src={image ?? ""} height={20} width={20} />
      <Text className="" size={"2"}>
        {title}
      </Text>
    </button>
  );
};

export default memo(ThirdPartyAuthButton);
