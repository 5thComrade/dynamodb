export const pageType = {
  chapter: "chapter",
  section: "section",
};

export const chapters = [
  {
    id: 1,
    chapter: 0,
    type: pageType.chapter,
    title: "Introduction",
    href: "/",
  },
  {
    id: 2,
    chapter: 0,
    type: pageType.chapter,
    title: "Requirements",
    href: "/requirements",
  },
  {
    id: 3,
    chapter: 1,
    type: pageType.chapter,
    title: "Chapter 1: What is DynamoDB?",
    href: "/chapter_1",
  },
  {
    id: 4,
    chapter: 1,
    type: pageType.section,
    title: "Key Properties of DynamoDB",
    href: "/chapter_1/1.1",
  },
  {
    id: 5,
    chapter: 2,
    type: pageType.chapter,
    title: "Chapter 2: Core Concepts of DynamoDB?",
    href: "/chapter_2",
  },
];
