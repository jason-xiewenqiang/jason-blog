module.exports = {
  title: "共济前端函数工具",
  description: "xbrother utils docs",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  base: "/",
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    nav: [
      { text: "指南", link: "/guide/install" },
      { text: "配置", link: "/config/api" },
      { text: "其他", link: "/other/" },
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
          children: ["/config/api"],
        },
      ],
    },
    sidebarDept: 2,
  },
};
