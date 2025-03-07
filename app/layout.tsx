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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/img/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/img/favicon/site.webmanifest" />
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
