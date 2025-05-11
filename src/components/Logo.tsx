import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-end flex-row">
      <Image
      className=""
        src={"/logo-icon.png"}
        alt="site-logo"
        height={45}
        width={45}
      />
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
