import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://blog.woven.xin", // replace this with your deployed domain
  author: "Lisunke",
  desc: "简单的写点东西",
  title: "朝圣之路",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "zh-CN", // html lang code. Set this empty and default will be "en"
  langTag: ["zh-CN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/CrazyZard",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:l541306829@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
];
