/** @type {import('next').NextConfig} */

import rehypeHighlight from 'rehype-highlight';

// eslint-disable-next-line import/no-anonymous-default-export
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
  i18n: {
    locales: ["en-US", "pt-BR"],
    defaultLocale: "en-US",
    localeDetection: false,
  },
}
