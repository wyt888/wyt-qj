# 360°-全景主图

## Dependency

1. [FFmpeg (Fast Forward Mpeg)](http://ffmpeg.org)
一套可以用来记录、转换数字音频、视频，并能将其转化为流的开源计算机程序.
项目中主要用来**视频**转换为**图片**.通过NODE调用命令行来使用
#### 安装 - MAC
> brew install ffmpeg

#### 安装 - linux
Linux 上安装比较麻烦.
Linux版本
>Linux version 2.6.32-431.el6.x86_64 (mockbuild@x86-023.build.eng.bos.redhat.com) (gcc version 4.4.7 20120313 (Red Hat 4.4.7-4) (GCC) ) #1 SMP Sun Nov 10 22:19:54 EST 2013

###### 源码编译安装:
`
$ wget https://johnvansickle.com/ffmpeg/release-source/ffmpeg-3.3.3.tar.xz
$ tar xvJf ffmpeg-3.3.3.tar.xz
$ cd ffmpeg-3.3.3
$ ./configure
$ make
$ make install
`
如果需要安装yasm
`
$ yum install yasm
`



###### yum 安装: 
暂时没有找到解决方案.

###### rpm 安装 - 参考网站:
a. https://www.rpmfind.net/linux/RPM/mageia/cauldron/x86_64/media/core/release/ffmpeg-3.3.3-3.mga7.x86_64.html
b. https://www.rpmfind.net/linux/rpm2html/search.php?query=ffmpeg


2. [GraphicsMagick](http://www.graphicsmagick.org/index.html)
GraphicsMagick号称图像处理领域的瑞士军刀。 
短小精悍的代码却提供了一个鲁棒、高效的工具和库集合，来处理图像的读取、写入和操作，支持超过88种图像格式
安装 依赖 与 gm
>brew install libjpeg  - 图片
brew install jasper
brew install libpng
brew install freetype
brew install graphicsmagick

Linux 安装
`
$ wget ftp://ftp.graphicsmagick.org/pub/GraphicsMagick/1.3/GraphicsMagick-1.3.24.tar.xz
$ cd GraphicsMagick-1.3.24
$ ./configure
$ make
$ make install
`


3. [gm v1.9.0 ( GraphicsMagick for node.js )](https://github.com/aheckmann/gm)
**GraphicsMagick**与**ImageMagick**的NODE插件
安装 - NPM
> npm install gm

4. [ThinkJS](https://thinkjs.org)
ThinkJS 是一款使用 ES6/7 特性全新开发的 Node.js MVC 框架
安装
>npm install thinkjs@2 -g --verbose

5. 数据库选用的MYSQL(暂时还在本地开发);
PS: 数据库相关配置参照ThinkJS 的配置 (/src/common/config)

## 项目结构
> ├ src 后端项目源码
  │ ├ back
  │ ├ common
  │ └ fore
  │
> ├ view 项目的页面资源
  │ ├ back
  │ ├ common
  │ └ fore
  │
> └ www 静态资源
    └ static
      ├ css
      ├ img
      ├ js
      └ upload
  
## 开发环境操作

安装依赖
`
npm install
`

启动本地服务器
`
npm start
`

## 规划
前端暂时用的jquery,页面放在了thinkJS的项目中,后期计划转成VUE.


**[Back to top](#360°-全景主图)**