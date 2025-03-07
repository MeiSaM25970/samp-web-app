"use client";

import { Layout } from "antd";
import { FC, PropsWithChildren } from "react";
import { MainLayoutStyled } from "./style";
import { MainHeader } from "./components/MainHeader";
import { useTheme } from "@/app/theme";
import { usePathname } from "next/navigation";
import { publicRoutes } from "@/middleware";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const {
    theme: { colors },
  } = useTheme();
  const pathname = usePathname();
  if (publicRoutes.includes(pathname)) return children;
  return (
    <Layout style={{ background: colors.background.bg2 }}>
      <MainHeader />
      <MainLayoutStyled>{children}</MainLayoutStyled>
    </Layout>
  );
};

export default MainLayout;
