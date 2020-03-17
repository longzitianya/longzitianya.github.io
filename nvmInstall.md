一、用nvm-noinstall.zip安装
1.nvm-windows 下载
https://github.com/coreybutler/nvm-windows/releases

把nvm_noinstall.zip解压到比如c:/dev/nvm 中(其它盘也可以，建议开发有关的安装在C盘)；
3.右键以管理员的身份运行install.cmd . 直接按回车,在C盘根目录下会生成一个setting,txt.并拷贝到C:/dev/nvm.修改内容:

root: C:\dev\nvm
path: C:\dev\nodejs
arch: 64
proxy: none
node_mirror: http://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
4.配置环境变量

打开‘控制面板主页->高级系统设置->高级->环境变量’后会有‘用户变量’和‘系统变量’两个选项，建议在‘用户变量’里面设置:
NVM_HOME:C:\dev\nvm
NVM_SYMLINK:C:\dev\nodejs
PATH:%NVM_HOME%;%NVM_SYMLINK%(在PATH的最后添加%NVM_HOME%;%NVM_SYMLINK%)
5.npm全局安装

npm config set prefix “c:\dev\nvm\npm”（配置用npm下载包时全局安装的包路径）
npm install npm -g --registry=https://registry.npm.taobao.org（安装全局的npm,注意‘–g’里面的‘-’要把输入法切换成中文的情况下输入）
6.配置npm环境变量
-变量名: NPM_HOME 变量值: c:\dev\nvm\npm (一定要放在NVM_SYMLINK之前);

7.nrm 安装

npm install nrm –g --registry=https://registry.npm.taobao.org
常用命令
nrm ls
nrm use taobao
二、用nvm-setup.zip安装
1、在github上下载nvm-setup.zip包解压后只有一个nvm-setup.exe，放在你想放的盘里，点击它next...
2、配置环境变量及其它，过程同用nvm-noinstall.zip安装。
注意：
npm config set prefix “c:\dev\nvm\npm”（配置用npm下载包时全局安装的包路径，把“c:\dev\nvm\npm”改成自己想要的路径，并把生成的文件‘.npmrc’放到你的用户目录下）。

作者：tiger亮
链接：https://www.jianshu.com/p/1d80cf35abd2
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
