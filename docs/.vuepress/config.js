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
      { text: "学习", link: "/study/npm" },
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
          children: [
            // "/study/nodejs",
            "/study/npm",
            // "/study/go",
            "/study/vue",
            "/study/react",
            "/study/redux",
            // "/study/webpack",
            // "/study/mysql",
            // "/study/mongodb",
          ],
        },
      ],
    },
    sidebarDept: 2,
  },
};
