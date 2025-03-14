"use client";
import { useTheme } from "@/app/theme";
import { ROUTES } from "@/constants/Routes";
import { Flex } from "antd";
import Icons from "espil-icons";
import Link from "next/link";
import { FC } from "react";
interface IProps {
  hasNotifications?: boolean;
}
export const HeaderTitleMobile: FC<IProps> = ({ hasNotifications = true }) => {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <Flex gap={16} align="center">
      <Link href={ROUTES.home}>
        <span className="samp">SAMP</span>
      </Link>
      {hasNotifications && (
        <div
          style={{
            background: colors.background.bg1,
            width: 36,
            height: 36,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          <Icons name="BellOutline" color={colors.icon.icDef} />
        </div>
      )}
    </Flex>
  );
};
