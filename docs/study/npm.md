# Package manager

> 从npm到pnpm的包管理历程

## nodejs 之 '3N'

> Node.js 是一个开源的、跨平台的 JavaScript 运行时环境。

### nvm

- 卸载之前安装的 Node
    - 打开电脑 【程序与功能】> 【应用和功能】
    - 卸载 Nodejs
    - 打开电脑属性 > 高级系统设置 > 删除 path 中的nodejs path

- 安装 nvm
    - 下载 nvm-setup.exe
    - 安装 nvm
    - 查看环境变量 path
    ```js
        NODE_PATH C:\Users\xxx\AppData\Roaming\npm\node_modules
        NODE_HOME C:\Users\xxx\AppData\Roaming\nvm
        NODE_SYMLINK C:\Program Files\nodejs
    ```

- 使用 nvm 管理 node 版本
    - 查看哪些 node 版本可以使用
    ```js
        nvm list available
        >> 
        |   CURRENT    |     LTS      |  OLD STABLE  | OLD UNSTABLE |
        |--------------|--------------|--------------|--------------|
        |    20.3.0    |   18.16.0    |   0.12.18    |   0.11.16    |
        |    20.2.0    |   18.15.0    |   0.12.17    |   0.11.15    |
        |    20.1.0    |   18.14.2    |   0.12.16    |   0.11.14    |
        |    20.0.0    |   18.14.1    |   0.12.15    |   0.11.13    |
        |    19.9.0    |   18.14.0    |   0.12.14    |   0.11.12    |
        |    19.8.1    |   18.13.0    |   0.12.13    |   0.11.11    |
        |    19.8.0    |   18.12.1    |   0.12.12    |   0.11.10    |
        |    19.7.0    |   18.12.0    |   0.12.11    |    0.11.9    |
        |    19.6.1    |   16.20.0    |   0.12.10    |    0.11.8    |
        |    19.6.0    |   16.19.1    |    0.12.9    |    0.11.7    |
        |    19.5.0    |   16.19.0    |    0.12.8    |    0.11.6    |
        |    19.4.0    |   16.18.1    |    0.12.7    |    0.11.5    |
        |    19.3.0    |   16.18.0    |    0.12.6    |    0.11.4    |
        |    19.2.0    |   16.17.1    |    0.12.5    |    0.11.3    |
        |    19.1.0    |   16.17.0    |    0.12.4    |    0.11.2    |
        |    19.0.1    |   16.16.0    |    0.12.3    |    0.11.1    |
        |    19.0.0    |   16.15.1    |    0.12.2    |    0.11.0    |
        |   18.11.0    |   16.15.0    |    0.12.1    |    0.9.12    |
        |   18.10.0    |   16.14.2    |    0.12.0    |    0.9.11    |
        |    18.9.1    |   16.14.1    |   0.10.48    |    0.9.10    |

        This is a partial list. For a complete list, visit https://nodejs.org/en/download/releases
    ```
    - 查看本地当前安装 node 版本
    ```js
        nvm ls/list
        >> 
        * 16.14.0 (Currently using 64-bit executable) // 带星号时为当前的版本标记
        14.14.0
        12.13.0

        // 查看远程服务器所有 node 版本
        // nvm ls-remote

        node -v
        >>
        v12.13.0
    ```
    - 安装一个版本
    ```js
        nvm install 18.10.0
        >> 
        Downloading node.js version 18.10.0 (64-bit)...
        Extracting node and npm...
        Complete
        npm v8.19.2 installed successfully.

        Installation complete. If you want to use this version, type

        nvm use 18.10.0

    ```
    - 切换一个版本
    ```js
        nvm use 14.14.0
        >>
        Now using node v14.14.0 (64-bit)
    ```
    - 卸载一个版本
    ```js
        nvm uninstall 16.16.0
        >> 
        Uninstalling node v16.16.0... done

        // 卸载当前使用的版本会怎么样？
        nvm list 
        >> 
        18.10.0
        16.14.0
        14.14.0
      * 12.13.0 (Currently using 64-bit executable)

        nvm uninstall 12.13.0
        Uninstalling node v12.13.0... done

        // 此时 node -v 时读取版本时会报错 
        >>
        node : 无法将“node”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确
        ，然后再试一次。
        所在位置 行:1 字符: 1
        + node -v
        + ~~~~
            + CategoryInfo          : ObjectNotFound: (node:String) [], CommandNotFoundException
            + FullyQualifiedErrorId : CommandNotFoundException
        
        // 需要重新进行 nvm use 14.14.0 才能正确使用 node
    ```

### nrm

- npm registries manager
- nrm can help you easy and fast switch between different npm registries, now include: npm, cnpm, taobao, nj(nodejitsu)
- install
    ```js
        npm i nrm -g
    ```
- check registries list
    ```js
        nrm ls // 查看源
    ```
- 运行报错的处理
    - node 版本过高 nvm install 12.13.0
    - open包与当前node版本不匹配
- nrm ls 结果
    ```js
      * npm ---------- https://registry.npmjs.org/
        yarn --------- https://registry.yarnpkg.com/
        tencent ------ https://mirrors.cloud.tencent.com/npm/
        cnpm --------- https://r.cnpmjs.org/
        taobao ------- https://registry.npmmirror.com/
        npmMirror ---- https://skimdb.npmjs.com/registry/
    ```
    *号位于空行时，使用默认npm的 registry
- nrm 其他命令的使用
    - 测试源响应时间
    ```js
        nrm test npm

        >> * npm ------ 1851ms

        nrm test taobao

        >> taobao --- 1138ms

        nrm test yarn 

        >> yarn ----- 2029ms
    ```
    - 切换源
    ```js
        nrm use tabbao

        >> Registry has been set to: https://registry.npmmirror.com/

        nrm use npm

        >> Registry has been set to: https://registry.npmjs.org/

    ```
    - 定制源
    ```js
        nrm add xbro http://192.168.33.140:8888

        >> add registry xbro success

        nrm ls

        >>  npm ---------- https://registry.npmjs.org/
            yarn --------- https://registry.yarnpkg.com/
            tencent ------ https://mirrors.cloud.tencent.com/npm/
            cnpm --------- https://r.cnpmjs.org/
            taobao ------- https://registry.npmmirror.com/
            npmMirror ---- https://skimdb.npmjs.com/registry/
            xbro --------- http://192.168.33.140:8888/
    ```
    - 删除源
    ```js
        nrm del xbro

        >> delete registry xbro success

        nrm ls

        >>  npm ---------- https://registry.npmjs.org/
            yarn --------- https://registry.yarnpkg.com/
            tencent ------ https://mirrors.cloud.tencent.com/npm/
            cnpm --------- https://r.cnpmjs.org/
            taobao ------- https://registry.npmmirror.com/
            npmMirror ---- https://skimdb.npmjs.com/registry/
    ```

### npm

#### 简介

- [Npm英文官网](https://docs.npmjs.com/)
- [Npm中文网](https://npm.nodejs.cn/about-npm)

> npm is the world's largest software registry. Open source developers from every continent use npm to share and borrow packages, and many organizations use npm to manage private development as well.
---
> npm 是世界上最大的软件注册表。 来自各大洲的开源开发者使用 npm 来共享和借用包，许多组织也使用 npm 来管理私有开发。

npm 由三个不同的组件组成：
- 网站
    > 使用 网站 发现包、设置配置、以及管理 npm 体验的其他方面。 例如，你可以设置 组织 来管理对公共或私有包的访问
- 命令行接口（cli）
    > CLI 从终端运行，是大多数开发者与 npm 交互的方式。
- 注册表
    > 注册表 是 JavaScript 软件及其周围元信息的大型公共数据库。

#### 安装

> npm 是与 Nodejs 绑定的，所以此前正确用 nvm 使用了 node版本时，npm 同等生效

- 查看 npm 版本
    ```js
        npm -v
        >> 
        6.14.8
    ```
- 更新你的 npm 版本
    ```js
        npm install npm@latest -g
    ```

#### 基础使用

- 常用命令
    ```js
        npm init (-y) // 生成package.json
        npm -v // npm 版本信息
        npm install package_name // 安装package
        npm uninstall package_name // 卸载package
        npm info package_name // 显示包信息
    ```

- 全局命令
    ```js
        npm install -g package // 全局安装
        npm update -g package // 升级
        npm list -g --depth=0 // 全局安装的模块
        npm uninstall -g package
        npm config get prefix // 获取全局安装包的所在地址,并且可见对应的cmd命令
        npm cache clean -f // 清除缓存
    ```

#### cnpm

> 这是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。[CNPM 是中国 npm 镜像的客户端](https://npmmirror.com/)

- cnpm sync package 同步包
- 其他命令 除了 publish 都是与 npm 相同

#### npx命令

> npx是一个工具，npm v5.2.0引入的一条命令（npx），一个npm包执行器，指在提高从npm注册表使用软件包时的体验。

- 可以直接执行npm包中的可执行文件
- 避免全局安装模块
- 可以指定node版本、命令的版本，解决了不同项目使用不同版本的命令的问题
- 执行GitHub源码(必须是项目模块：包含package.json与入口文件)

#### package.json

1. 简介
    > - 与 npm 强关联的文件；配置和描述如何与程序交互和运行的中心；
    > - npm CLI（和 yarn）用它来识别你的项目并了解如何处理项目的依赖关系;
    > - 使 npm 可以启动你的项目、运行脚本、安装依赖项、发布到 NPM 注册表以及许多其他有用的任务。

2. 作用
    > - 作为一个描述文件，描述项目所依赖的包
    > - 使用 “语义化版本规则”[2.0](https://semver.org/lang/zh-CN/)指明项目依赖包的版本
    > - 让构建更好地与其他开发者分享，重复使用

3. 区分包与模块
    - 这里的包指的是由 package.json 文件描述的文件或目录。 包必须包含 package.json 文件才能发布到 npm 注册表
    - 模块：是 node_modules、src 目录下的任何文件或目录，可以通过 Node.js require() 功能加载

4. 字段
    - name | required: 包的名称，必须是小写和一个单词，并且可以包含连字符和下划线
    - version | required: 必须采用 x.x.x 格式，遵循 [语义版本控制2.0](https://semver.org/lang/zh-CN/)
    - description: 当前包描述信息，如果为空字符串，则会发布后引入readme 的第一行作为描述，便于搜索
    - main: 可选字段， 指定了项目加载的入口文件，默认根目录下的index.js
    - scripts: 一个由脚本命令组成的 hash 对象，他们在包不同的生命周期中被执行
    - keywords: 字符串数组，便于用户搜索
    - homepage: 项目的主页地址
    - bugs: 项目问题反馈的Url或报告问题的邮箱地址
    - license: 项目许可证，让使用者知道如何使用此项目,有何权限来使用我们的模块，以及使用该模块有限制等，常见的 MIT, Apache2.0，GPL等
    - author,contributors：author一个person对象，Contributors表示person的数组，相当于一群person
    - files：一个文件数组，描述了将软件包作为依赖项安装时要包括的条目；下载依赖包所包含的文件
    - browser：要在客户端使用模块，则应使用browser字段来代替main字段
    - bin：来指定各个内部命令对应的可执行文件的位置
    - man：用来指定当前模块的man文档的位置
    - directories：用来标识模块结构的方法，类似于commonjs包规范的介绍，想查看npm中的package.json，就可以看到doc、lib、man目录及位置
    - repository：{ "type" : "git", "url" : "https://github.com/npm/XXX.git" }
    - config：用于添加命令行的环境变量 { "port" : "8080" }
    - dependencies：包都是程序所依赖的包,需要发布到生产环境的 --save
        ```js
            // 波浪号 ~ 
            ~1.2.2 规则是安装时取 1.2.x x最大（新）的版本，但不大于1.3

            // 插入号 ^
            ^1.2.2 规则是安装时取 1.x.y 不低于 1.2.2，但不高于 2.0.0

            // 最新版本
            @latest

        ```
    - devDependencies：开发环境下的依赖 --save-dev
    - peerDependencies：用来供插件指定其所需要的主工具的版本；从npm 3.0版开始，peerDependencies不再会默认安装了
    - bundledDependencies： 是一个数组，指定发布时将定义的模块一起打包
    - optionaldependencies： 如果出现包找不到或者安装失败时，但又不影响npm继续运行，可将该包放在optionalDependencies对象中。
    - engines： 指明了该模块运行的平台，比如Node``的某个版本，或者npm的某个版本或者浏览器。
    - os： 项目将运行在什么操作系统上
    - cup： 项目将运行在什么cpu架构上
    - private： 决定我们的项目是否会发布，如果设置为true,那么npm会拒绝发布
    - publishConfig： 模块发布时生效，设置一些值的集合
    - preferGlobal： 表示在不安装为全局时给予显示警告

5. 五种 dependencies

    在 Node.js 中，package.json 文件中有两个重要的字段：dependencies 和 devDependencies。这两个字段都用于指定项目所需的依赖项，但是它们之间有一些重要的区别：

    - dependencies：这个字段用于指定生产环境所需的依赖项，也就是你的应用程序或库在运行时所需要的依赖项。这些依赖项将被安装在项目的 node_modules 目录下，并且在生产环境中默认会被安装。
    - devDependencies：这个字段用于指定开发环境所需的依赖项，也就是你在开发过程中需要使用的依赖项，例如测试框架、构建工具等。这些依赖项也将被安装在项目的 node_modules 目录下，但是在生产环境中不会被默认安装。
    - peerDependencies：这个字段用于指定当前包所需要的其他包的版本范围。这些依赖项不会被安装在项目的 node_modules 目录下，而是需要在使用当前包时手动安装。
    - optionalDependencies：这个字段用于指定可选的依赖项，也就是在某些条件下需要使用的依赖项。这些依赖项不会被默认安装，但是如果它们可用，则会被安装
    - bundleDependencies：这个字段用于指定需要打包在浏览器端或其他环境中使用的依赖项。这些依赖项将被打包到当前包中，而不是作为外部依赖项被加载

    因此，devDependencies 中的依赖项只在开发过程中使用，并且不会被打包到生产环境中。这有助于减少生产环境的体积，并且可以确保生产环境中只包含必要的依赖项。
#### 查询一个包

- 搜索包
    [npmjs.com](https://www.npmjs.com/)
- 搜索的逻辑包含4个维度：人气（被下载）、质量（测试、相关文件、稳定性）、维护（开发者对包维护）、最佳（前三组合分数）
- 搜索结果
    ![npm-search](/image.png)

#### 贡献一个包

[npm中文网](https://npm.nodejs.cn/)

![官网](/image-3.png)

##### 准备包（公有包-私有包是收费的）

- mkdir xro-npm-test
- cd xbro-npm-test
- npm init -y
- wirte one function
- 修改package.json

##### 登录npm

- 检查当前的 nrm 是哪一个：需要切换至 npm 镜像
- npm login
- 按照提示：输入账号、密码、邮箱、一次性验证码（从你的账号邮箱里查看）

    ![npm login](/image-1.png)

##### 执行publish

- 执行成功后
    ![published](/image-2.png)
- 检验能否安装已发布的包
    1. 查看 npmjs.com 上是否有你刚刚发布的包
    2. 找一个项目进行安装验证
- 发布带 scope 的包
    - 在 npmjs.com 用户界面创建组织
    ![组织](/image-4.png)
    - 发布时，包名（package.json [name]）使用 ·@xxx/· 作为前缀
    ![发布](/image-5.png)

## yarn

[安全、稳定、reproducible projects](https://www.yarnpkg.cn/)

> Yarn 是一个软件包管理器，还可以作为项目管理工具。无论你是小型项目还是大型单体仓库（monorepos），无论是业余爱好者还是企业用户，Yarn 都能满足你的需求。

- 速度超快
    <p>Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。</p>

- 超级安全
    <p>在执行代码之前，Yarn 会通过算法校验每个安装包的完整性。</p>

- 超级可靠
    <p>使用详细、简洁的锁文件格式和明确的安装算法，Yarn 能够保证在不同系统上无差异的工作。</p>

    ![yarn](/image6.png)

### yarn基本使用

- 初始化项目
    ```js
        yarn init
    ```
- 添加依赖包
    ```js
        yarn add package
        yarn add package@version
        yarn add package@tag
    ```
- 添加依赖包到不同依赖类别
    ```js
        yarn add package --save-dev // default
        yarn add package --dev
        yarn add package --peer
        yarn add package --optional
    ```
- 升级依赖包
    ```js
        yarn upgrade package
        yarn upgrade package@version
        yarn upgrade package@tag
    ```
- 移除依赖
    ```js
        yarn remove package
    ```

### why yarn

> 为什么要推出 yarn

- 早期 npm 的问题
    1. 速度慢：npm 按照队列执行安装每个 package，只有当前 package 安装完成之后，才会进行后面的安装。[yarn 并行执行]
    2. 同一个项目，npm 安装的时候无法保持一致性
        ```js
            "5.0.3",  //安装指定的5.0.3版本
            "~5.0.3", //安装5.0.X中的最新版本
            "^5.0.3"  //安装5.X.X中的最新版本
        ```
    3. npm 安装的时候，一个包抛出错误，npm 会继续下载安装包，而且因为 npm 会把所有的日志输出到终端，有关错误包的错误信息就会淹没在 npm 打印的警告中，你甚至不会发现错误的产生

- yarn 的优势
    - 离线模式（重要）：之前已经安装过一个软件包，再次安装时就不用再从网络下载，npm 饱受诟病的一点就是，每次安装依赖，都需要从网络下载一大堆东西，而且是全部重新下载
    - 依赖关系确定性（重要）lock文件的作用，当然 npm 后期优化版本也有lock的特性了
    - 扁平模式（重要）
    ```js
        node_modules
            ├── A
            ├── somelib 1.7.x
            ├── B
            │   └── node_modules
            │        └── somelib 1.5.x
            └── C
                └── node_modules
                        └── somelib 1.5.x
    ```

## pnpm

### pnpm 简介

> 快速的，节省磁盘空间的包管理工具优势

[PNPM](https://pnpm.io/zh/)

- 快速
    <p>pnpm 比其他包管理器快 2 倍</p>
- 高效
    <p>node_modules 中的文件为复制或链接自特定的内容寻址存储库</p>
- 支持 monorepos    
    <p>pnpm 内置支持单仓多包</p>
- 严格    
    <p>pnpm 默认创建了一个非平铺的 node_modules，因此代码无法访问任意包</p>

### pnpm 初衷

- 节省磁盘空间
    <p>使用 npm 时，依赖每次被不同的项目使用，都会重复安装一次。  而在使用 pnpm 时，依赖会被存储在内容可寻址的存储中</p>
    <p>1. 如果你用到了某依赖项的不同版本，只会将不同版本间有差异的文件添加到仓库。 例如，如果某个包有100个文件，而它的新版本只改变了其中1个文件。那么 pnpm update 时只会向存储中心额外添加1个新文件，而不会因为仅仅一个文件的改变复制整新版本包的内容。</p>
    <p>2. 所有文件都会存储在硬盘上的某一位置。 当软件包被被安装时，包里的文件会硬链接到这一位置，而不会占用额外的磁盘空间。 这允许你跨项目地共享同一版本的依赖。</p>

- 提高安装速度
    <p>pnpm 分三个阶段执行安装</p>
    <p>1. 依赖解析。 仓库中没有的依赖都被识别并获取到仓库</p>
    <p>2. 目录结构计算。 node_modules 目录结构是根据依赖计算出来的。</p>
    <p>3. 链接依赖项。 所有以前安装过的依赖项都会直接从仓库中获取并链接到 node_modules</p>

- 创建一个非扁平的 node_modules 目录
    <p>使用 npm 或 Yarn Classic 安装依赖项时，所有的包都被提升到模块目录的根目录。 这样就导致了一个问题，源码可以直接访问和修改依赖，而不是作为只读的项目依赖。</p>
### pnpm 安装

- 使用 npm 安装
    ```js
        npm install -g pnpm
    ```
- 其他安装请自行查阅官网安装教程 [installtion](https://pnpm.io/zh/installation)

### pnpm 命令（重要）

#### 依赖管理

一、 pnpm add [package]

- 安装至不同依赖类型
    ```js
        pnpm add package        // dependencies 
        pnpm add package -D     // devDependencies 
        pnpm add package -O     // optionalDependencies 
        pnpm add package -g     // Install package globally 
        pnpm add package@next   // next 标签
        pnpm add package@3.0.0  // @3.0.0 标签
    ```
- 不同包地址
    1. from npm：pnpm 默认安装会从 npm  registry 安装最新的 package
    2. 从 worksapce 中安装：我们配置了workspace时，可以进行安装
    3. 从本地安装：源码文件、本地目录
    4. 从远端安装tar包：一个可以访问的url
    5. 从git中安装：pnpm add [git remote url]，通过 git clone
- 更多信息请点击 [Link](https://pnpm.io/zh/cli/add)

二、 pnpm install

- 离线下载
    ```js
        pnpm i --offline    // 仅从 store 中离线下载
    ```
- 其他命令
    ```js
        pnpm i --frozen-lockfile    // 不更新 pnpm-lock.yaml
        pnpm i --lockfile-only      // 只更新 pnpm-lock.yaml
    ```
- 更多配置信息 [Link](https://pnpm.io/zh/cli/install) 

三、 pnpm update (up)

- 根据指定的范围更新软件包的最新版本
    ```js
        pnpm up             // 遵循 package.json 指定的范围更新所有的依赖项
        pnpm up --latest    // 遵循 package.json 指定的范围更新所有的依赖项
        pnpm up foo@2       // 将 foo 更新到 v2 上的最新版本
        pnpm up "@babel/*"  // 更新 @babel 范围内的所有依赖项
    ```
- 使用 Pattern 来更新特定的依赖项
    ```js
        pnpm update "\!webpack"  // 更新所有依赖，排除 weebpack
        pnpm update "@babel/*" "\!@babel/core"  // 更新babel，排除 core
    ```
- 更多配置信息 [Link](https://pnpm.io/zh/cli/update)

四、 pnpm list (ls)

- 此命令会以一个树形结构输出所有的已安装package的版本及其依赖

## PK

### timeline

    ```bash
        ## 工具发布时间线
        History
            |
            |--- 2010年1月 npm @0.0.1 发布
            |
            |--- 2013年12月 cnpm @0.0.1 发布
            |
            |--- 2015年6月 npm @3 发布 （node_modulse扁平化）
            |
            |--- 2016年8月 pnpm @0.1.0 发布 （下载速度快、通过连接方式公用文件）
            |
            |--- 2016年10月 yarn 首版发布 (支持离线安装、yarn.lock、优化加载速度，同步下载、安装失败自动重启)
            |--- 同期 npm @4 发布 （npm-shrinkwrap.json文件确定依赖）
            |
            |--- 2017年5月 npm @5 发布 （支持离线安装、package.lock.json兼容 npm-shrinkwrap.json）
            |
            |--- 2017年7月 npm @5.2 发布，同时 npx 诞生
            |
            |--- 2018年5月 npm @6 发布，<npm init pkg>  
            |
            |--- 2020年 yarn@2 和 npm @7 发布
            |
            |--- 2021年 yarn@3 发布
    ```

### npm/yarn是如何管理node_modules

- npm@3 之前 node_modules​结构可以说是整洁​、可预测的

    ```js
        node_modules 
            └─ 依赖A 
                ├─ index.js 
                ├─ package.json 
                └─ node_modules 
                    └─ 依赖B 
                    ├─ index.js 
                    └─ package.json
            └─ 依赖C 
                ├─ index.js 
                ├─ package.json 
                └─ node_modules 
                    └─ 依赖B 
                        ├─ index.js 
                        └─ package.json
                        └─ node_modules 
                            └─ 依赖D 
                                ├─ index.js 
                                ├─ package.json 
                                └─ node_modules 
                                    └─ 依赖E 
                                        ├─ index.js 
                                        └─ package.json
    ```
    - 依赖包重复安装：依赖A与依赖C同时引用了依赖B，此时的依赖B会被下载两次
    - 依赖层级过多：C -> B -> D -> E，一个依赖地狱，不利于维护，（window下文件查找路径最大限制）
    - 模块实例无法共享

- npm@3 与 yarn
    ```js
        node_modules 
            └─ 依赖A  
                ├─ index.js 
                ├─ package.json 
                └─ node_modules 
            └─ 依赖C   
                ├─ index.js 
                ├─ package.json 
                └─ node_modules 
            └─ 依赖B 
                ├─ index.js 
                ├─ package.json 
                └─ node_modules
    ```
    - 依赖结构的不确定性(lock文件产生)：A与C都依赖B，但是依赖了B不同版本，具体哪一个版本被提升使用，取决于安装速度，出现不确定性，解决是整了一个lock文件
    - 扁平化算法的复杂度增加
    - 项目中仍然可以非法访问没有声明过的依赖包(幽灵依赖：项目中使用了一些 没有被定义在其 package.json 文件中 的 包。)
        - 不兼容的版本
        - 丢失依赖
        <p>NodeJS 的 require() 函数能够在依赖目录找到它们，因为 require() 在查找文件夹时 根本不会受 package.json 文件 影响。这可能有点反直觉，但是跑起来没啥问题。也许这算是一个功能而不是 bug？</p>
    ![幽灵安全](/image12.png)


### 比较

- npm 安装包流程
    - resolving：首先他们会解析依赖树，决定要fetch哪些安装包。
    - fetching：安装去fetch依赖的tar包。这个阶段可以同时下载多个，来增加速度。
    - wrting：然后解压包，根据文件构建出真正的依赖树，这个阶段需要大量文件IO操作。

- pnpm 
    - resolving：解析依赖树，目录结构计算，获取 store 中没有记录的包
    - fetching
    - linking: 建立软链

- 一份来自 pnpm 官网的比较图

![比较图](/image7.png)

![install](/image8.png)

![compare](/image9.png)

- 其他比较

![pnpm](/image10.png)

![yarn](/image11.png)

## 总结

三者相同点：管理和安装包的工具

- yarn 出现较早期 npm
    - npm 早期：不支持离线模式
    - npm 早期：树形结构的依赖
    - npm 早期：依赖安装不确定性
    - npm 早期：项目版本不一致问题等
    - yarn 解决：校验其完整性
    - yarn 解决：并行执行包
    - yarn 解决：已经安装的包保存进缓存目录
    - yarn 解决：实现版本固化，lock文件
    - yarn 解决：安装信息简化输出

- pnpm 与 npm&yarn
    - 包安装速度极快
    - 高效的使用磁盘空间： 将包存储在同一文件夹中（content-addressable store），只要当你在同一OS的同一个用户在下再次安装时就只需要创建一个硬链接
    - 安全性高: 解决幽灵依赖（依赖管理的方式也很巧妙地规避了非法访问依赖的问题，也就是只要一个包未在 package.json 中声明依赖，那么在项目中是无法访问的）


> 前端未来包管理工具：pnpm

