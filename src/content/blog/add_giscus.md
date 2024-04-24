---
author: Lisunke
pubDatetime: 2024-04-24
title: astro 博客添加 giscus 评论系统
slug: astro_add_giscus
featured: true
draft: false
tags:
  - astro
  - giscus
description: 感觉一个良好的博客系统是需要一个反馈的
---

# Astro 博客添加评论、留言插件

> 静态的网站，因为没有后端，如果要添加评论留言等操作就需要通过第三方插件来实现操作

## 选择扩展插件

### Disqus：

- 允许无限制地在一个站点上使用评论功能。

* 包含基本的评论功能和社交媒体集成。
* 会显示 Disqus 的广告。

### Commento：

- 允许在一个站点上使用评论功能，每月最多 5,000 次页面加载。
- 包含基本的评论功能和自定义主题选项。

### GitTalk：

- 将每篇文章的评论作为一个独立的 GitHub Issue 存储在你的 GitHub 仓库中
- 对于每篇新文章，需要手动或自动触发 Issue 的创建来启用评论功能
- Gitalk 提供了一个简洁的用户界面，支持 Markdown 格式的评论 、允许开发者自定义评论界面的样式

### Giscus ：

- 将评论存储在一个特定的 GitHub 仓库中的 Discussions 区域，而不是作为 Issues。
- 自定义程度较低，因为它依赖于 GitHub 的 Discussions 界面
- 可以自动将文章映射到 GitHub Discussions 中的讨论，不需要手动创建

## 创建 Giscus 配置

1. 在 [github](https://github.com/new) 创建一个公开的仓库
2. 登录 [giscus](https://giscus.app/zh-CN) 网站 , 开始配置

> 选择新 discussions 所在的分类。 推荐使用**公告（announcements）**类型的分类，以确保新 discussion 只能由仓库维护者和 giscus 创建。

![something](@assets/images/add_giscus_1.png) 3. 获取 启动 JS

> 选择新 discussions 所在的分类。 推荐使用**公告（announcements）**类型的分类，以确保新 discussion 只能由仓库维护者和 giscus 创建。

![something](@assets/images/add_giscus_1.png)

4. 新建 Comments.astro 组件 复制启动JS
   `src/components/Comments.astro`

```
<section class="giscus mx-auto mt-10 w-full"></section>
   # 复制的JS
   <script src="https://giscus.app/client.js"
           data-repo="CrazyZard/commnet"
           data-repo-id="*"
           data-category="Announcements"
           data-category-id="DIC_kwDOLyi0_s4Ce5kd"
           data-mapping="pathname"
           data-strict="0"
           data-reactions-enabled="1"
           data-emit-metadata="1"
           data-input-position="top"
           data-theme="preferred_color_scheme"
           data-lang="zh-CN"
           data-loading="lazy"
           crossorigin="anonymous"
           async>
   </script>
```

5. 在 Footer.astro 修改加入参数 `src/layouts/PostDetails.astro`

```
   ---
   import Comments from "@components/Comments.astro";
   ---
  <Layout>
  <Footer>
  <Comments/>
  <Footer />
  </Layout>
```
