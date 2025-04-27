import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-end flex-row">
      {/* <Image
      className=""
        src={"/logo.png"}
        alt="site-logo"
        height={100}
        width={100}
      /> */}
      <Image
      className=""
        src={"/logo-icon.png"}
        alt="site-logo"
        height={60}
        width={60}
      />
      <Image
      className=""
        src={"/logo-name.png"}
        alt="site-logo"
        height={190}
        width={190}
      />
    </Link>
  );
};

export default memo(Logo);
