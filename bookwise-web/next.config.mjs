/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            "images.unsplash.com",
            "localhost",
            "avatars.githubusercontent.com"
        ]
    }
};

export default nextConfig;
