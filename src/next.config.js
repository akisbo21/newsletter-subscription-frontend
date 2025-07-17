const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias["@"] = path.resolve(__dirname, "src")
        return config
    },
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
    },
}

module.exports = nextConfig
