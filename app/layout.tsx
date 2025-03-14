import { ThemeContextProvider } from "./theme";
import { BodyWrapper } from "./styles";
import Script from "next/script";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App } from "antd";
import StyledComponentsRegistry from "@/lib/registry";
import { AppProvider } from "@/context/AppContext";
import "./styles/global.style.css";
import ConfigProviders from "@/components/ConfigProvider";
import { axiosConfiguration } from "@/hooks/axiosConfig";
import { ReactQueryClient } from "@/context/ReactQuery";
import MainLayout from "@/layout/MainLayout";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  axiosConfiguration();

  return (
    <html lang="fa" className="overflow-x-hidden">
      <head>
        <link rel="icon" href="/images/favicon.svg" sizes="any" />
        <title>Samp</title>
      </head>

      <BodyWrapper>
        <Script src="//unpkg.com/d3" />
        <AntdRegistry>
          <App>
            <StyledComponentsRegistry>
              <ReactQueryClient>
                <ThemeContextProvider>
                  <AppProvider>
                    <ConfigProviders>
                      <MainLayout>{children}</MainLayout>
                    </ConfigProviders>
                  </AppProvider>
                </ThemeContextProvider>
              </ReactQueryClient>
            </StyledComponentsRegistry>
          </App>
        </AntdRegistry>
      </BodyWrapper>
    </html>
  );
}
