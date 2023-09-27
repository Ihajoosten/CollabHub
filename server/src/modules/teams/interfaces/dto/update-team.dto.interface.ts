export interface IUpdateTeamDto {
  name?: string;
  description?: string;
  isPublic?: boolean;
  tags?: string[];
  imageUrl?: string;
  // Statistical properties
  memberCount?: number;
  postCount?: number;
  commentCount?: number;
  lastActivity?: Date;
  upvotes?: number;
  downvotes?: number;
}
