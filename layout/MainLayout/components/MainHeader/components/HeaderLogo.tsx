"use client";
import { Flex } from "antd";
import Image from "next/image";
import { FC } from "react";

export const HeaderLogo: FC = () => {
  return (
    <Flex align="center" gap={32}>
      <Image
        width={56}
        height={56}
        src={"/images/jahadK.svg"}
        alt="jahadK"
        priority
      />
      <Image
        width={44.17}
        height={56}
        src={"/images/jahadT.svg"}
        alt="jahadT"
        priority
      />
    </Flex>
  );
};
