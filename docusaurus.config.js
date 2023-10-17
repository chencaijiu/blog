/* eslint-disable @typescript-eslint/no-var-requires */
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lightCodeTheme = require('prism-react-renderer/themes/github');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: '三木',
    tagline:
      '三木技术分享',
    url: 'https://sanmustudy.cn',
    baseUrl: '/',
    favicon: 'img/logo.png',
    organizationName: 'SanMu',
    projectName: 'SanMuBlog',
    // onBrokenLinks: 'throw',
    // onBrokenMarkdownLinks: 'throw',
    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            path: 'docs',
            sidebarPath: 'sidebars.js',
            editUrl:
              'https://github.com/calmound/sanmu-blog',
            // versions: {
            //   current: {
            //     label: 'current',
            //   },
            // },
            // lastVersion: 'current',
            showLastUpdateAuthor: true,
            showLastUpdateTime: true,
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        }),
      ],
    ],
    plugins: ['my-loaders', 'tailwind-loader'],
    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        algolia: {
          appId: 'R2IYF7ETH7',
          apiKey: '599cec31baffa4868cae4e79f180729b',
          indexName: 'docsearch',
          contextualSearch: true,
        },
        metadata: [
          {
            name: 'google-site-verification',
            content: '23yIHmCD_xnJb_6e3s-w7M29Kydahk-d86ObMWOrvRg',
          },
        ],
        navbar: {
          hideOnScroll: true,
          title: "三木小站",
          // logo: {
          //   alt: '三木',
          //   src: 'img/logo.png',
          //   srcDark: 'img/docsearch-logo-white.svg',
          // },
          items: [
            // left
            {
              label: '技术学习',
              to: 'docs/vue/01 环境搭建',
              position: 'right',
            },
            // {
            //   label: '杂七杂八',
            //   to: 'apply',
            //   position: 'right',
            // },
            // right
            // {
            //   type: 'docsVersionDropdown',
            //   position: 'right',
            // },
            {
              href: 'https://github.com/algolia/docsearch',
              position: 'right',
              className: 'header-github-link',
            },
          ],
        },
        colorMode: {
          defaultMode: 'light',
          disableSwitch: false,
          respectPrefersColorScheme: true,
        },
        // 顶部tips
        // announcementBar: {
        //   content:
        //     '⭐️ If you like DocSearch, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/algolia/docsearch">GitHub</a>! ⭐️',
        // },
        // footer: {
        //   links: [
        //     {
        //       title: '技术',
        //       items: [
        //         {
        //           label: 'Getting Started',
        //           to: 'docs/what-is-docsearch',
        //         },
        //         {
        //           label: 'FAQ',
        //           to: 'docs/docsearch-program',
        //         },
        //         {
        //           label: 'DocSearch v3',
        //           to: 'docs/DocSearch-v3',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'DocSearch',
        //       items: [
        //         {
        //           label: 'Apply',
        //           to: 'apply',
        //         },
        //         {
        //           label: 'Issues',
        //           to: 'https://github.com/algolia/docsearch/issues',
        //         },
        //         {
        //           label: 'Privacy',
        //           to: 'https://www.algolia.com/policies/privacy/',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Community',
        //       items: [
        //         {
        //           label: 'Forum',
        //           to: 'https://discourse.algolia.com/tags/docsearch',
        //         },
        //         {
        //           label: 'Discord',
        //           to: 'https://discord.com/invite/bRTacwYrfX',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Social',
        //       items: [
        //         {
        //           label: 'GitHub',
        //           to: 'https://github.com/algolia/docsearch',
        //         },
        //         {
        //           label: 'Twitter',
        //           to: 'https://twitter.com/docsearch_',
        //         },
        //         {
        //           label: 'Algolia Blog',
        //           to: 'https://algolia.com/blog/',
        //         },
        //       ],
        //     },
        //   ],
        //   logo: {
        //     alt: 'Algolia',
        //     src: 'img/Algolia-logo-blue.svg',
        //     srcDark: 'img/Algolia-logo-white.svg',
        //     width: 200,
        //   },
        //   copyright: 'DocSearch 2015-now • Designed and built by Algolia',
        // },
        // image: 'img/og_image.png',
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
      }),
  }
);
