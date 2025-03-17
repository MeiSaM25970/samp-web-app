// import withTM from "next-transpile-modules";

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    // برای پشتیبانی از ماژول‌های ES
    config.module.rules.push({
      test: /\.m?js$/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    });
    if (isServer) {
      config.module.rules.push({
        test: /\.node$/,
        use: "node-loader",
      });
    }
    return config;
  },
  reactStrictMode: false,
};

export default nextConfig;
