/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io", // Autorise les images depuis utfs.io
        pathname: "/**", // Autorise tous les chemins sous utfs.io
      },
      {
        protocol: "https",
        hostname: "cloud.inery", // Autorise les images depuis cloud.inery
        pathname: "/**", // Autorise tous les chemins sous cloud.inery
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Autorise les images depuis res.cloudinary.com
        pathname: "/**", // Autorise tous les chemins sous res.cloudinary.com
      },
    ],
  },
};

export default nextConfig;
