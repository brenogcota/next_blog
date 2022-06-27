/** @type {import('next').NextConfig} */

import rehypeHighlight from 'rehype-highlight';

export default {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            providerImportSource: '@mdx-js/react',
            rehypePlugins: [rehypeHighlight],
          },
        },
      ],
    });

    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'images.unsplash.com', 'i.scdn.co'],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}
