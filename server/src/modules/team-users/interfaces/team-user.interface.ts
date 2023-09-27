export interface ITeamUser {
  teamId: number;
  userId: number;
  role: TeamRoleType;
  joinedAt: Date;
}

export enum TeamRoleType {
  OWNER = 'owner',
  LEAD_DEVELOPER = 'lead-developer',
  DEVELOPER = 'developer',
  UX_UI_DESIGNER = 'ux/ui designer',
  TESTER = 'tester',
}
