// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: [
//             "res.cloudinary.com"
//         ]
//     },
//     //output: "standalone"
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
        ],
    },
    //output: "standalone"
}

module.exports = nextConfig;

