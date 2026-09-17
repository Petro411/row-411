import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";


const Logo = () => {
  return (
    <Link href={"/"} className="flex items-end flex-row">
      {/* <Image
      className=""
        src={"/logo-icon.png"}
        alt="Petro411 - Logo icon"
        title="Petro411 - Logo icon"
        height={45}
        width={45}
      /> */}
      <Image
        className=""
        src={"/logo-name.png"}
        alt="Petro411 - Logo"
        title="Petro411 - Logo"
        height={155}
        width={155}
        preload
      />
    </Link>
  );
};

export default memo(Logo);
