import { Flex } from "antd";
import { FC } from "react";

export const HeaderTitle: FC = () => {
  return (
    <Flex gap={16} align="center">
      <span className="samp">SAMP</span>
      <Flex gap={4} align="center">
        <span className="des">سامانه جامع مدیریت پروژه</span>
        <span className="sampFa">سمپ</span>
      </Flex>
    </Flex>
  );
};
