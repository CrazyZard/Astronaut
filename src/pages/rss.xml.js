import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blog = await getCollection("blog");
  return rss({
    title: "Buzz’s Blog",
    description: "A humble Astronaut’s guide to the stars",
    site: context.site,
    items: blog.map(post => ({
      title: post.data.title,
      pubDate: post.data.pubDatetime,
      description: post.data.description,
      // customData: post.data.customData,
      // 从 `slug` 属性计算出 RSS 链接
      // 这个例子假设所有的文章都被渲染为 `/blog/[slug]` 路由
      link: `/blog/${post.slug}/`,
    })),
  });
}
