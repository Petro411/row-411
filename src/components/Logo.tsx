import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";


const Logo = () => {
  return (
    <Link href={"/"} className="flex items-end flex-row">
      {/* <Image
      className=""
        src={"/logo-icon.png"}
        alt="site-logo"
        height={45}
        width={45}
      /> */}
      <Image
      className=""
        src={"/logo-name.png"}
        alt="site-logo"
        height={155}
        width={155}
      />
    </Link>
  );
};

export default memo(Logo);
