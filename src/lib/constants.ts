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
    title: "1.1: Key Properties of DynamoDB",
    href: "/chapter_1/1.1",
  },
  {
    id: 5,
    chapter: 1,
    type: pageType.section,
    title: "1.2: When to use DynamoDB?",
    href: "/chapter_1/1.2",
  },
  {
    id: 6,
    chapter: 2,
    type: pageType.chapter,
    title: "Chapter 2: Core Concepts of DynamoDB?",
    href: "/chapter_2",
  },
  {
    id: 7,
    chapter: 2,
    type: pageType.section,
    title: "2.1: Basic Vocabulary",
    href: "/chapter_2/2.1",
  },
  {
    id: 8,
    chapter: 2,
    type: pageType.section,
    title: "2.2: A Deeper Look: Primary keys and secondary indexes",
    href: "/chapter_2/2.2",
  },
  {
    id: 9,
    chapter: 2,
    type: pageType.section,
    title: "2.3: The importance of item collections",
    href: "/chapter_2/2.3",
  },
  {
    id: 10,
    chapter: 3,
    type: pageType.chapter,
    title: "Chapter 3: Advanced Concepts",
    href: "/chapter_3",
  },
];
