"use client";
import { useTheme } from "@/app/theme";
import { C2, C7 } from "@/components/UiKit/Typography";
import { Flex, Spin } from "antd";
import { FC, ReactNode } from "react";

export const ProjectText: FC<{
  label: ReactNode;
  value: ReactNode;
  hasPrefix?: boolean;
  loading?: boolean;
}> = ({ label, value, hasPrefix = true, loading }) => {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <Flex gap={12}>
      <C2 style={{ color: colors.text.thirdText }}>{label}</C2>
      <C2>
        {loading ? <Spin size="small" className="mx-[24px]" /> : value || "--"}
      </C2>
      {hasPrefix && <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>}
    </Flex>
  );
};
