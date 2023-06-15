# package manager 包管理

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
        npm install <package_name> // 安装package
        npm uninstall <package_name> // 卸载package
        npm info <package_name> // 显示包信息
    ```
- 全局命令
    ```js
        npm install -g <package> // 全局安装
        npm update -g <package> // 升级
        npm list -g --depth=0 // 全局安装的模块
        npm uninstall -g <package>
        npm config get prefix // 获取全局安装包的所在地址,并且可见对应的cmd命令
        npm cache clean -f // 清除缓存
    ```

#### cnpm

> 这是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。[CNPM 是中国 npm 镜像的客户端](https://npmmirror.com/)

- cnpm sync <package> 同步包
- 其他命令 除了 publish 都是与 npm 相同

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





### 查询一个包

### 安装一个包

### 贡献一个包



### npm 版本历史&问题

## yarn

### yarn基本使用

## pnpm

### pnpm 基本使用