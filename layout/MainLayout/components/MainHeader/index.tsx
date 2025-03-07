import { FC } from "react";
import { Flex } from "antd";
import { MainHeaderContainer } from "../../style/MainHeader";
import { HeaderLogo } from "./components/HeaderLogo";
import { Profile } from "./components/Profile";
import { HeaderTitle } from "./components/Title";
export const MainHeader: FC = () => {
  return (
    <MainHeaderContainer>
      <Flex align="center" justify="space-between" className="w-full box">
        <HeaderTitle />
        <HeaderLogo />
        <Profile />
      </Flex>
    </MainHeaderContainer>
  );
};
