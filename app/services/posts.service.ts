import type {
  DatabaseInterface,
  PostIdentifier,
  PostInterface,
} from "../interfaces";

export const postsService = (database: DatabaseInterface) => {
  const getPosts = async (): Promise<Array<PostInterface>> => {
    return await database.getPosts();
  };

  const getPost = async (
    postIdentifier: PostIdentifier
  ): Promise<PostInterface> => {
    return await database.getPost(postIdentifier);
  };

  return {
    getPost,
    getPosts,
  };
};
