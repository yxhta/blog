import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BookIcon, HomeIcon, TagIcon } from "lucide-react";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        {/*<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" aria-label="Logo">*/}
        {/*<title>Blog Logo</title>*/}
        {/*<circle cx={12} cy={12} r={12} fill="currentColor" />*/}
        {/*</svg>*/}
        blog.yxhta.com
      </>
    ),
  },
  links: [
    {
      icon: <HomeIcon />,
      text: "Home",
      url: "/",
    },
    {
      icon: <BookIcon />,
      text: "Blog",
      url: "/blog/list",
      active: "nested-url",
    },
    {
      icon: <TagIcon />,
      text: "Tags",
      url: "/blog/tags",
    },
  ],
};
