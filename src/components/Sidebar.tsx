import { memo, useEffect } from "react";
import { homeRoutes } from "@/config/HomeRoutes";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Link, Text } from "@radix-ui/themes";

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
      </ul>
    </div>
  );
};

export default memo(Sidebar);
