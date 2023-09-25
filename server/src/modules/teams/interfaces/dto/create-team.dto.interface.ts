export interface ICreateTeamDto {
  name: string;
  description: string;
  isPublic: boolean;
  ownerUserId: number;
  tags: Array<string>;
  imageUrl: string;
}
