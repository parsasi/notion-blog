import type { PostIdentifier, PostInterface } from "./post.interface";

export type DatabaseConfigInterface = Record<string, unknown>;

export interface DatabaseInterface {
  getPosts: () => PostInterface[] | Promise<PostInterface[]>;
  getPost: (
    postIdentifier: PostIdentifier
  ) => PostInterface | Promise<PostInterface>;
}
