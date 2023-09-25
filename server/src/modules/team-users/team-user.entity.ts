import { ITeamUser, TeamRoleType } from './interfaces/team-user.interface';
import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Team } from '../teams/team.entity';
import { User } from '../users/user.entity';

@Table
export class TeamUser extends Model<TeamUser> implements ITeamUser {
  @ForeignKey(() => Team)
  @Column({ type: DataType.INTEGER, allowNull: false })
  teamId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @Column({
    type: DataType.ENUM(
      'owner',
      'lead-develoepr',
      'developer',
      'ux/ui designer',
      'tester',
    ),
    allowNull: false,
  })
  role: TeamRoleType;

  @Column({ type: DataType.DATE, allowNull: false })
  joinedAt: Date;

  // Define associations with Team and User
  @BelongsTo(() => Team, {
    foreignKey: 'teamId',
    targetKey: 'id',
  })
  team: Team;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
    targetKey: 'id',
  })
  user: User;
}
