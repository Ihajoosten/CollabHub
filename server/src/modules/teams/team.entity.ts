import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { ITeam } from './interfaces/team.interface';
import { User } from '../users/user.entity';

@Table
export class Team extends Model<Team> implements ITeam {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isPublic: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  imageUrl: string;

  @ForeignKey(() => User)
  @Column
  ownerId: number;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  tags: Array<string>;

  @Column({ type: DataType.INTEGER, allowNull: true })
  memberCount?: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  postCount?: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  commentCount?: number;

  @Column({ type: DataType.DATE, allowNull: true })
  lastActivity?: Date;

  @Column({ type: DataType.INTEGER, allowNull: true })
  upvotes?: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  downvotes?: number;

  // Define association with owner user
  @BelongsTo(() => User, {
    foreignKey: 'ownerId',
    targetKey: 'id',
  })
  owner: User;
}
