---
author: Lisunke
pubDatetime: 2024-04-20
title: Mac环境下Root oneplus-ACE 安卓手机
slug: root_andriod
featured: true
draft: false
tags:
  - andriod
  - root
  - mac
description: 使用 Charles + Android 7.0 版本抓包，但发现无法安装系统证书，需要系统就行root
---

## <center>andriod 7.0 抓包教程 MAC 版本</center>

<center><font color=red>！！！！！解锁Bootloader“教程会清空手机里全部数据！！！！！！</font></center>

### 安装工具包

```
brew install android-platform-tools
# 需要打开手机的开发者工具哦 ，系统 -> 安卓版本 -> 多点几次
# 然后打开 OEM 工具 USB调试 选文件传输 之后选择依旧如此
```

### 解锁机器

> <font color=blue>该步骤不会清空手机所有数据</font>

```
fastboot reboot-bootloader
# 本机是 oneplus Ace  按了音量键+ 解锁
fastboot flashing unlock
fastboot reboot
```

### 下载安卓包 && 解压

```
unzip 8fb1391c359c4411814f1e7e666cba34.zip
================================================
Archive:  8fb1391c359c4411814f1e7e666cba34.zip
signed by SignApk
 extracting: META-INF/com/android/metadata
 extracting: META-INF/com/android/metadata.pb
 extracting: payload.bin


 extracting: payload_properties.txt
  inflating: META-INF/com/android/otacert
(base)
```

### 安装 payload 解压工具 && 解锁 boot.img

```
git clone https://github.com/vm03/payload_dumper.git
cd payload_dumper
pip3 install protobuf
pip3 install bsdiff4
# 迁移payload.bin文件到当前目录
mv ~/Downloads/payload.bin ./
python3 payload_dumper.py payload.bin
# 我的版本过搞 报错了
pip uninstall protobuf
pip install protocol==3.19.0
python3 payload_dumper.py payload.bin
================================================================
Processing system partition............................................................................................................................................................................................................................................................................................................................................................................................Done
Processing system_ext partition.........................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................Done
Processing product partition..Done
Processing vbmeta_system partition.Done
Processing boot partition................................Done
================================================================
# 到这一步就可以 ctrl+c 了 我们只要 boot.img 输出在 output 文件夹内
adb push ./boot.img /sdcard/Download/

```

### 安装 masgisk apk

> [最新版本查看](https://github.com/topjohnwu/Magisk/releases)

```
wget https://github.com/topjohnwu/Magisk/releases/download/v27.0/Magisk-v27.0.apk
adb push ~/Downloads/Magisk-v27.0.apk /sdcard/Download/
# 安装完之后 选择安装 -> 选择并修改文件 -> 选择我们之前的 boot.img
# 安装成功之后会自动重启
```

### success

安装成功就可以安装系统抓包证书
