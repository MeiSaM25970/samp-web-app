import { ConfigProvider, ThemeConfig } from "antd";
import { FC, ReactNode } from "react";
import { useOverride } from "./override";
import { useResponsive } from "antd-style";
import { ThemeProvider } from "styled-components";
import fa_IR from "antd/locale/fa_IR";
import en_US from "antd/locale/en_US";
import { useTheme } from "@/app/theme";
import { useLanguage } from "@/store/languages";
import { GlobalStyle } from "@/styles/global.style";

interface IProps {
  children: ReactNode;
}

const ConfigProviders: FC<IProps> = ({ children }) => {
  const overrideToken = useOverride();
  const { mobile } = useResponsive();
  const { theme } = useTheme();
  const { isRtl } = useLanguage();
  const antdTheme: ThemeConfig = {
    components: overrideToken,
    cssVar: true,
    hashed: false,
  };
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider
        theme={antdTheme}
        componentSize={mobile ? "small" : "middle"}
        direction={isRtl ? "rtl" : "ltr"}
        locale={isRtl ? fa_IR : en_US}
      >
        <GlobalStyle />
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
};
export default ConfigProviders;
