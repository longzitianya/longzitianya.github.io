Windows下使用Nodist管理多个node版本

访问Nodist主页
https://github.com/nullivex/nodist
，下载安装包，安装好软件。注：如果电脑之前安装了Node，安装Nodist之前需要卸载掉Node；
更换淘宝镜像，加速。进入Nodist安装目录，打开cli.js，将distUrl、iojsDistUrl更换成如下即可：
var distUrl = 'https://npm.taobao.org/mirrors/node';
var iojsDistUrl = 'https://npm.taobao.org/mirrors/iojs';
npm加速。打开命令行窗口，输入命令：
npm config set registry https://registry.npm.taobao.org
4. 常用命令：
nodist //查看当前安装了的node版本列表
nodist 4.4.6 //设置全局node的版本，如果该版本不存在，会先下载node
nodist + 4.4.6 //检查该版本有没有安装，如果没有，会进行下载
nodist -4.4.6 //移除某个版本
