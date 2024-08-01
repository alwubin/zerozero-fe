/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // SVG 파일을 처리하기 위한 rule 추가
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
        },
      ],
    });

    return config;
  },
  images: {
    domains: ['s3.ap-northeast-2.amazonaws.com'],
  },
};

export default nextConfig;