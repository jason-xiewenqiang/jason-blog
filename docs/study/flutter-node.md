# Flutter 

::: danger 万事开头难
    Flutter Learning
:::

## 环境准备

| 物料          | 下载地址           | 备注  |
| ------------- |:-------------:| -----:|
| window10      | - | - |
| fultter.zip      | [官网下载地址](https://storage.flutter-io.cn/flutter_infra_release/releases/stable/windows/flutter_windows_3.0.1-stable.zip)      |   - |
| android studio | [Android studio](https://developer.android.google.cn/studio)      |    - |

> 安装步骤
1. 解压文件包 **flutter_windows_3.0.1-stable.zip** ，复制到C盘并确认位置
2. 设置window环境变量 打开电脑高级属性设置 -> 环境变量 -> 用户变量的path里添加 C:\xxx\flutter\bin （flutter-path:） 以及 C:\xxx\flutter\bin\cache\dart-sdk\bin （dart-path）；保存
3. 检查是否成功：打开 CMD 面板，输入 flutter --version 检验 flutter，输入 dart --version
4. 安装android studio，一路点击安装即可；安装 flutter 插件以及dart 插件（plugin maket中搜索）
5. 配置 虚拟显示机：找到 Device manager，找到创建按钮 create device, 定位 Phone 选择项，创建一个属于自己的虚拟手机设备（studio自带的设备无法运行的）
6. 新建项目：打开CMD面板，在你的目标文件夹下，运行 flutter create "projectname" 创建项目
7. 使用 android studio 打开项目，点击运行或（Ctrl + F5）

::: tip flutter pub get 出错
    如果在创建项目是出现错误，那么需要进行额外配置请求地址
    打开电脑高级属性设置，在系统变量中加入两个变量
    PUB_HOSTED_URL=https://pub.flutter-io.cn
    FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
:::