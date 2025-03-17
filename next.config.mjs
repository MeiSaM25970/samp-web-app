// import withTM from "next-transpile-modules";

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    // برای پشتیبانی از ماژول‌های ES
    config.module.rules.push({
      test: /\.m?js$/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
  reactStrictMode: false,
};

export default nextConfig;
