"use client";

import { Layout } from "antd";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { MainLayoutStyled } from "./style";
import { MainHeader } from "./components/MainHeader";
import { useTheme } from "@/app/theme";
import { usePathname } from "next/navigation";
import { publicRoutes } from "@/middleware";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const {
    theme: { colors },
  } = useTheme();
  const pathname = usePathname();
  useEffect(() => {
    setIsClient(true);
    return () => {
      setIsClient(false);
    };
  }, []);
  if (publicRoutes.includes(pathname)) return children;

  if (!isClient) {
    return null;
  }

  return (
    <Layout style={{ background: colors.background.bg2 }}>
      <MainHeader />
      <MainLayoutStyled>{children}</MainLayoutStyled>
    </Layout>
  );
};

export default MainLayout;
