---
author: Lisunke
pubDatetime: 2024-04-11
modDatetime: 2024-04-11
title: 添加新帖子注意事项
slug: adding-new-posts-in-astropaper-theme
featured: true
draft: false
tags:
  - initDocs
description: 使用AstroPaper创建或添加新帖子的一些规则和建议
---

## Frontmatter

Frontmatter 是存储博客文章（文章）一些重要信息的主要地方。 Frontmatter 位于文章顶部，以 `YAML` 格式编写。在astro 文档中阅读有关 frontmatter 及其用法的更多信息。

每个帖子的 frontmatter 属性列表。

| 字段               | 描述                                                         | 备注                                          |
| ------------------ | ------------------------------------------------------------ | --------------------------------------------- |
| **_title_**        | 帖子标题. (h1)                                               | required<sup>\*</sup>                         |
| **_description_**  | 帖子的描述。用于帖子摘录和帖子的网站描述。.                  | required<sup>\*</sup>                         |
| **_pubDatetime_**  | 以 ISO 8601 格式 发布日期时间.                               | required<sup>\*</sup>                         |
| **_modDatetime_**  | 以 ISO 8601 格式修改日期时间。(仅在修改博客文章时添加此属性) | optional                                      |
| **_author_**       | 作者.                                                        | default = SITE.author                         |
| **_slug_**         | 标签 此字段是可选的，但不能为空字符串。 (slug: ""❌)         | default = slugified file name                 |
| **_featured_**     | 是否在主页的特色部分显示此帖子                               | default = false                               |
| **_draft_**        | 将此帖子标记为 “未发布”                                      | default = false                               |
| **_tags_**         | 这篇文章的相关关键词以数组yaml格式编写。                     | default = others                              |
| **_ogImage_**      | OG图片的帖子。用于社交媒体共享和SEO.                         | default = SITE.ogImage or generated OG image  |
| **_canonicalURL_** | 规范URL (绝对)，以防该文章已存在于其他来源。                 | default = `Astro.site` + `Astro.url.pathname` |

> 提示！您可以通过 `new Date().toISOString()` 在控制台中运行来获取 ISO 8601 日期时间。但请确保删除引号。

frontmatter 中的 `title` , `description`​​ , `pubDatetime` 字段是必填的。

标题和描述（摘录）对于搜索引擎优化 (SEO) 非常重要，因此 AstroPaper 鼓励在博客文章中包含这些内容。

`slug` 是 url 的唯一标识符。因此，`slug` 必须是独特的并且不同于其他帖子. `slug`的空格应该用`-`或`_`分隔，建议使用`-`。 `slug` 是使用博客文章文件名自动生成的。可以将内容定义slug为博客文章中的标题。

> 可以理解为 文章的 `uuid`

如果您在博客文章中省略 `tags`（换句话说，如果未指定标签），则默认标签`others`将用作该帖子的标签。您可以在文件中设置默认标签 `/src/content/config.ts`

```ts
// src/content/config.ts
export const blogSchema = z.object({
  // ---
  draft: z.boolean().optional(),
  tags: z.array(z.string()).default(["others"]), // replace "others" with whatever you want
  // ---
});
```

### 例子

```yaml
# src/content/blog/sample-post.md
---
title: The title of the post
author: your name
pubDatetime: 2022-09-21T05:17:19Z
slug: the-title-of-the-post
featured: true
draft: false
tags:
  - some
  - example
  - tags
ogImage: ""
description: This is the example description of the example post.
canonicalURL: https://example.org/my-article-was-already-posted-here
---
```

## 添加目录表

默认情况下，帖子（文章）不包含任何目录（toc）。要包含目录，您必须以特定方式指定它。

例如，如果您想将目录放在介绍段落的正下方，您可以按以下方式执行此操作。

```md
---
# some frontmatter
---

Here are some recommendations, tips & ticks for creating new posts in AstroPaper blog theme.

## Table of contents

<!-- the rest of the post -->
```

## 标题

关于标题，有一点需要注意。 AstroPaper 博客文章使用标题（frontmatter 中的标题）作为文章的主要标题。因此，帖子中的其余标题应使用 h2 ~ h6。

此规则不是强制性的，但出于视觉、可访问性和 SEO 目的强烈建议使用。

## 存储博客内容的图像

这里有两种存储图像并在 Markdown 文件中显示图像的方法。

> 笔记！如果需要在 Markdown 中设置优化图像的样式，您应该使用[MDX](https://docs.astro.build/en/guides/images/#images-in-mdx-files)。

### 内部 `src/assets/` 目录（推荐）

您可以将图像存储在 `src/assets/` 目录中。这些图像将由 Astro 通过[图像服务API自动优化](https://docs.astro.build/en/reference/image-service-reference/).

您可以使用相对路径或别名路径 (`@assets/`) 来提供这些图像。
示例：假设您要显示`example.jpg`路径是`/src/assets/images/example.jpg`。

```md
![something](@assets/images/example.jpg)

<!-- OR -->

![something](../../assets/images/example.jpg)

<!-- Using img tag or Image component won't work ❌ -->
<img src="@assets/images/example.jpg" alt="something">
<!-- ^^ This is wrong -->
```

> 从技术上讲，您可以将图像存储在src.在这里，`src/assets`只是一个推荐。

### 内部 `public` 目录

您可以将图像存储在public目录中。请记住，存储在该 `public` 目录中的图像不会受到 Astro 的影响，这意味着它们不会被优化，您需要自己处理图像优化。
示例：假设 `example.jpg`位于`/public/assets/images/example.jpg`。

```
![something](/assets/images/example.jpg)

<!-- OR -->

<img src="/assets/images/example.jpg" alt="something">
```

### 图像压缩

当您在博客中放置图片时（特别是public目录下的图片），建议对图片进行压缩。这将影响网站的整体性能。

推荐的图像压缩网站。

- [TinyPng](https://tinypng.com/)
- [TinyJPG](https://tinyjpg.com/)

### 图像

如果帖子未指定 OG 图片，则将放置默认的 OG 图片。尽管不是必需的，但与帖子相关的 OG 图片应在 frontmatter 中指定。 OG 图像的建议尺寸为1200 X 640像素。

> 从 AstroPaper v1.4.0 开始，如果不指定，OG图像将自动生成。查看公告。
