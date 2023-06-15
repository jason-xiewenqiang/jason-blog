# MySQL

## windows 离线安装

- download: https://downloads.mysql.com/archives/community/
- blog: https://www.cnblogs.com/yangyezhuang/p/16896972.html

### 安装步骤

    1. 下载离线安装包
    2. 配置环境变量
        - 打开 ‘环境变量’，在系统变量内新建一个 MYSQL_HOME 变量
        ```javascript

        MYSQL_HOME  D:\MYSQL

        ```
        - 在系统变量内找到其中的 Path变量，双击打开，再最后加上 %MYSQL_HOME%\bin
    3. 新建 my.ini 文件 [D:\MYSQL\my.ini]
        ```ini
            [mysql]

            # 设置mysql客户端默认字符集
            default-character-set=utf8

            [mysqld]

            #设置3306端口
            port = 3306

            # 设置mysql的安装目录
            basedir=D:\MySQL

            # 设置mysql数据库的数据的存放目录
            datadir=D:\MySQL\data

            # 允许最大连接数
            max_connections=200

            # 服务端使用的字符集默认为8比特编码的latin1字符集
            character-set-server=utf8

            # 创建新表时将使用的默认存储引擎
            default-storage-engine=INNODB
        ```
    4. 以管理员身份打开cmd（win+x 后按 a 键）切换至 bin 文件夹内
        ```
            mysqld --initialize-insecure --user=mysql
        ```
    5. 安装服务
        ```
            mysqld -install

            ## mysqld -remove
        ```

### 进入 MySQL

    1. 启动 MySQL 服务
        > net start mysql
    2. 登录
        > mysql -u root -p
    3. 设置密码
        > ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
    4. 停止服务
        > net stop mysql

### Express 连接 Mysql

    1. 生成 Express 项目
    ```js
        mkdir examples && cd example

        express --no-view express-app

        cd express-app && npm install

        nodemon run start
    ```

    2. 安装 mysql 模块
    ```js
        npm install mysql
    ```

    3. 创建 sql 初始化文件
        1. 创建 database
        ```js
            // 根目录下创建 database 文件夹
            mkdir database

            // 创建 db.config.js
            const database = 'local' // 数据库名称
            const config = {
                host: '127.0.0.1',
                port: 3306,
                user: 'root',
                password: 'root'
            }

            module.exports = {
                database,
                config
            }
        ```
        2. 创建表初始化 SQL
        ```js
            name
        ```
    4. 
