import { ThemeContextProvider } from "./theme";
import { BodyWrapper } from "./styles";
import Script from "next/script";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App } from "antd";
import StyledComponentsRegistry from "@/lib/registry";
import { AppProvider } from "@/context/AppContext";
import "./styles/global.style.css";
import ConfigProviders from "@/components/ConfigProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ThemeContextProvider>
    //   <html lang="en">
    //     <body
    //       className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    //     >
    //       {children}
    //     </body>
    //   </html>
    // </ThemeContextProvider>
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
              <ThemeContextProvider>
                <AppProvider>
                  <ConfigProviders>
                    {/* <MainLayout hasToken={!!cookie}>{children}</MainLayout> */}
                    {children}
                  </ConfigProviders>
                </AppProvider>
              </ThemeContextProvider>
            </StyledComponentsRegistry>
          </App>
        </AntdRegistry>
      </BodyWrapper>
    </html>
  );
}
