"use client";
import { FC } from "react";
import { Flex } from "antd";
import { MainHeaderContainer } from "../../style/MainHeader";
import { HeaderLogo } from "./components/HeaderLogo";
import { Profile } from "./components/Profile";
import { HeaderTitle } from "./components/Title";
import { useMediaQuery } from "react-responsive";
import { breakPointsMd } from "@/constants/screen";
import { HeaderTitleMobile } from "./components/mobile/TitleMobile";
export const MainHeader: FC = () => {
  const isMobile = !useMediaQuery({ minWidth: breakPointsMd });

  return (
    <MainHeaderContainer>
      <Flex align="center" justify="space-between" className="w-full box">
        {isMobile ? <HeaderTitleMobile /> : <HeaderTitle />}
        {isMobile ? <div /> : <HeaderLogo />}
        <Profile />
      </Flex>
    </MainHeaderContainer>
  );
};
