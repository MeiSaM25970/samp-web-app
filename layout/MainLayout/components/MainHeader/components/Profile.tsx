"use client";
import { Avatar, Dropdown, Flex } from "antd";
import { MenuProps } from "antd/lib";
import { FC, useMemo } from "react";
import { UserOutlined } from "@ant-design/icons";
import Icons from "espil-icons";
import { useTheme } from "@/app/theme";
import { logout } from "@/lib/logout";
import { useMediaQuery } from "react-responsive";
import { breakPointsMd } from "@/constants/screen";

interface IProps {
  hasNotifications?: boolean;
}
export const Profile: FC<IProps> = ({ hasNotifications = true }) => {
  const {
    theme: { colors },
  } = useTheme();
  const isMobile = !useMediaQuery({ minWidth: breakPointsMd });

  const logoutHandler = () => {
    logout();
  };
  const items: MenuProps["items"] = useMemo(() => {
    const createdItems: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <div className="flex gap-[8px] py-[8px]" onClick={logoutHandler}>
            <Icons
              className="icon"
              name="Exit"
              size={24}
              color={colors.icon.icDef}
            />
            <span>خروج</span>
          </div>
        ),
      },
    ];
    return createdItems;
  }, [colors]);
  return (
    <Flex justify="center" align="center" gap={24}>
      <Dropdown
        menu={{ items }}
        trigger={["hover"]}
        placement="bottomLeft"
        rootClassName="dropdown"
      >
        <div className="flex gap-[8px] justify-center cursor-pointer items-center">
          <Icons name="ArrowDownSmall" color={colors.icon.icDef} />
          <Avatar size={isMobile ? 36 : 48} icon={<UserOutlined />} />
        </div>
      </Dropdown>
      {hasNotifications && !isMobile && (
        <div
          style={{
            background: colors.background.bg1,
            width: 40,
            height: 40,
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
