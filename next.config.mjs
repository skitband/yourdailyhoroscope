/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        statusCode: 301,
      },
    ];
  },
  images : {
      domains : ['newastro.vercel.app', 'localhost']
  }
};

export default nextConfig;
