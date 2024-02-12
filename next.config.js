/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' https://js.stripe.com; frame-src https://js.stripe.com; style-src 'self' 'unsafe-inline';",
                    },
                ]
            }
        ]
    }
}

module.exports = nextConfig
