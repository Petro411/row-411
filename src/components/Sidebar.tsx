import { memo, useEffect } from "react";
import { homeRoutes } from "@/config/HomeRoutes";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

type Props = {
  visible: boolean;
  setVisible: (val: boolean) => void;
};

const Sidebar = ({ visible, setVisible }: Props) => {
  useEffect(() => {
    if (visible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [visible]);

  return (
    <div
      className={`flex flex-col items-center justify-center lg:hidden fixed
        overflow-hidden
        top-0 right-0
        backdrop-brightness-[20%]
        z-50
        transition-all duration-300 ease-in-out
        opacity-0
        ${
          visible
            ? "w-full h-screen rounded-bl-none opacity-100"
            : "-right-20 w-0 h-0 rounded-bl-full"
        }`}
      onClick={() => setVisible(!visible)}
    >
      <ul
        className={`${
          visible ? "opacity-100" : "opacity-0"
        } flex flex-col gap-5`}
      >
        <li className="flex flex-row justify-center mb-5">
          <Cross1Icon
            color="white"
            height={25}
            width={25}
            className="cursor-pointer"
            onClick={() => setVisible(false)}
          />
        </li>
        {homeRoutes.map((item, index) => (
          <li key={index} className="text-center">
            <Link href={item.path} className="!text-white">
              <Text size={"4"} align={"center"}>
                {item.name}
              </Text>
            </Link>
          </li>
        ))}
        <li className="text-center">
          <Link href={""} className="!text-white">
            <Text size={"4"} align={"center"}>
              Dashboard
            </Text>
          </Link>
        </li>
        <li>
          <Flex
            direction={"row"}
            align={"center"}
            justify={"center"}
            gap={"5"}
            mt={"5"}
          >
            <Link
              href={"/auth/login"}
              className="py-3 px-5 bg-primary text-white rounded-lg"
            >
              <Text size={"3"}>Login</Text>
            </Link>
            <Link
              href={"/auth/sign-up"}
              className="py-3 px-5 bg-primary text-white rounded-lg"
            >
              <Text size={"3"}>Sign up</Text>
            </Link>
          </Flex>
        </li>
      </ul>
    </div>
  );
};

export default memo(Sidebar);
