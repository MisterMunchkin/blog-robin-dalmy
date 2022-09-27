// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Robin Dalmy',
  tagline: 'Writing tutorials I wish existed.',
  url: 'https://blog.robindalmy.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mistermunchkin', // Usually your GitHub org/user name.
  projectName: 'blog-robin-dalmy', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    [
      "./plugins/blog-plugin.js",
      {
        id: "blog",
        routeBasePath: "blog",
        path: "./blog",
        showReadingTime: true
      }
    ]
  ],
  scripts: [
    {
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6667237258230756",
      async: true,
      crossorigin: "anonymous"
    }
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: 'keywords', 
          content: 'how-to, blog, coding, programming, software development'
        }
      ],
      navbar: {
        title: 'Robin Dalmy',
        logo: {
          alt: 'My Site Logo',
          src: 'img/robin-bird-300px.png',
        },
        items: [
          {
            href: 'https://github.com/mistermunchkin',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Other Things',
            items: [
              {
                label: 'Portfolio',
                href: 'https://robindalmy.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/mistermunchkin',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/robindalmy',
              },
            ],
          },
        ],
        copyright: `Built with ❤️ by RobinDalmy`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
