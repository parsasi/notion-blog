import type { DatabaseInterface, DatabaseConfigInterface } from "../interfaces";
const { Client } = require("@notionhq/client");

export const configDatabase = ({
  notionKey,
  databaseId,
}: DatabaseConfigInterface): DatabaseInterface => {
  const notion = new Client({
    auth: notionKey,
  });

  const getPageWithId = async (pageId: string) => {
    return await notion.pages.retrieve({ page_id: pageId });
  };

  return {
    getPost: async (postIdentifier) => {
      const rawPosts = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: "slug",
          text: {
            equals: postIdentifier,
          },
        },
      });
      return rawPosts;
    },
    getPosts: async () => {
      const rawPosts = await notion.databases.query({
        database_id: databaseId,
      });
      const posts =
        rawPosts?.results.map((item: { id: string }) =>
          getPageWithId(item.id)
        ) ?? [];

      return Promise.all(posts);
    },
  };
};
