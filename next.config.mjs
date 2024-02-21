/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["mysql2", "knex"]
    }
};

export default nextConfig;
