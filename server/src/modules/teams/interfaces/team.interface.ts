export interface ITeam {
  name: string;
  description: string;
  isPublic: boolean;
  ownerId: number;
  tags: Array<string>;
  imageUrl: string;
  // Statistical properties
  memberCount?: number;
  postCount?: number;
  commentCount?: number;
  lastActivity?: Date;
  upvotes?: number;
  downvotes?: number;
}
