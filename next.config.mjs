/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['s3.amazonaws.com', 't4.ftcdn.net']
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/properties',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
