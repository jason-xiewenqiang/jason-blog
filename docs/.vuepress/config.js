module.exports = {
  title: "笔记本",
  description: "Note book",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  base: "/",
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    nav: [
      { text: "指南", link: "/guide/install" },
      { text: "配置", link: "/config/api" },
      { text: "笔记", link: "/other/flutter-node" },
      { text: "Github", link: "https://github.com/jason-xiewenqiang" },
    ],
    sidebar: {
      "/guide/": [
        {
          title: "指南",
          children: ["/guide/install"],
        },
      ],
      "/config/": [
        {
          title: "配置",
          children: ["/config/api", "/config/guide"],
        },
      ],
      "/other/": [
        {
          title: "Flutter",
          children: ["/other/flutter-node", "/other/node-js"],
        },
      ]
    },
    sidebarDept: 2,
  },
};
