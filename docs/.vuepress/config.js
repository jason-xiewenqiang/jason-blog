module.exports = {
  title: "笔记本",
  description: "Note book",
  head: [["link", { rel: "icon", href: "/head.jpg" }]],
  base: "/",
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    nav: [
      { text: "学习", link: "/study/flutter-node" },
      { text: "运动", link: "/sport/api" },
      { text: "生活", link: "/live/install" },
      { text: "Github", link: "https://github.com/jason-xiewenqiang" },
    ],
    sidebar: {
      "/live/": [
        {
          title: "生活",
          children: ["/live/install"],
        },
      ],
      "/sport/": [
        {
          title: "运动",
          children: ["/sport/api", "/sport/guide"],
        },
      ],
      "/study/": [
        {
          title: "学习",
          children: ["/study/flutter-note", "/study/node-js", "/study/vue", "/study/webpack"],
        },
      ]
    },
    sidebarDept: 2,
  },
};
