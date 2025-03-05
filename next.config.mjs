/** @type {import('next').NextConfig} */
import withTM from "next-transpile-modules";
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/i,
      exclude: [/node_modules\/(?!(tailwindcss)\/).*/], // نادیده گرفتن همه node_modules به جز tailwindcss
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
          },
        },
        "postcss-loader",
      ],
    });
    return config;
  },
  reactStrictMode: false,
};

export default withTM(["espil-icons"])({ ...nextConfig });
