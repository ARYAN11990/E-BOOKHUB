/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    // To allow all SVGs/images from remote, you could broaden this, but specific is better
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
