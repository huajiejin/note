module.exports = {
  base: '/note/',
  head: [
    ['link', { rel: 'icon', href: 'https://avatars0.githubusercontent.com/u/49019730?s=460&v=4' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: 'https://avatars0.githubusercontent.com/u/49019730?s=460&v=4' }],
    ['link', { rel: 'mask-icon', href: 'https://avatars0.githubusercontent.com/u/49019730?s=460&v=4', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: 'https://avatars0.githubusercontent.com/u/49019730?s=460&v=4' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '笔记',
      description: '知识总结，代码示例',
    },
    '/dev/': {
      lang: 'zh-CN 1',
      title: '开发笔记',
      description: '开发笔记',
    },
    '/cim/': {
      lang: 'zh-CN 2',
      title: '计算机信息管理',
      description: '计算机信息管理',
    },
  },
  themeConfig: {
    repo: 'huajiejin/note',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    serviceWorker: { updatePopup: true },
    locales: {
      '/': {
        label: '首页',
        selectText: '首页',
        nav: [
          { text: '文章', link: '/blog/' },
        ],
        sidebar: {
          '/blog/': genSidebarConfig('所有文章', [ '', 'puppeteer', 'antd', 'electron', 'virtualbox' ]),
        }
      },
      '/dev/': {
        label: '开发笔记',
        selectText: '开发笔记',
        nav: [
          { text: '前端', link: '/dev/front-end/' },
          { text: '后端', link: '/dev/back-end/' },
        ]
      },
      '/cim/': {
        label: '计算机信息管理',
        selectText: '计算机信息管理',
        nav: [
          {
            text: '所有课程',
            items: [
              { text: 'c', link: '/cim/c/' },
            ]
          }
        ],
      },
    },
  },
  markdown: {
    lineNumbers: true,
  },
}

function genSidebarConfig (title, children) {
  return [
    {
      title,
      collapsable: false,
      children,
    }
  ]
}
