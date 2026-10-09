/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_GSC_VERIFICATION_TOKEN:
      process.env.NEXT_PUBLIC_GSC_VERIFICATION_TOKEN ||
      'ZKAseaHP8O9kEQVcZtT2FNttY18RqTnUVrZeh6bTTy8',
    NEXT_PUBLIC_GA_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  },
};

module.exports = nextConfig;
