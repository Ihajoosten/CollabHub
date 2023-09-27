export interface ICreateTeamDto {
  name: string;
  description: string;
  isPublic: boolean;
  ownerId: number;
  tags: Array<string>;
  imageUrl: string;
}
