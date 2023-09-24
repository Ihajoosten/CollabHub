import { Model, Table, Column, DataType } from 'sequelize-typescript';
import { GenderType, IUser } from './interfaces/user.interface';

@Table
export class User extends Model<User> implements IUser {
  @Column({ type: DataType.STRING, allowNull: false })
  firstname: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastname: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @Column({ type: DataType.DATE, allowNull: false })
  birthday: Date;

  @Column({ type: DataType.ENUM('male', 'female'), allowNull: false })
  gender: GenderType;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isActive: boolean;
}
