import { Flex } from "antd";
import { US, IR } from "country-flag-icons/react/3x2";

export const languagesOption = [
  {
    value: "Fa",
    label: (
      <Flex align="center" gap={6}>
        <IR className="w-[20px] h-[14px]" />
        <span>{" فارسی "}</span>
      </Flex>
    ),
  },
  {
    value: "En",
    label: (
      <Flex align="center" gap={6}>
        <US className="w-[20px] h-[14px]" />
        <span>{" English "}</span>
      </Flex>
    ),
  },
];
