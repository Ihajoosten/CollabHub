import { Inject, Injectable, Logger } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/common/constants';
import { User } from './user.entity';
import { IUserService } from './interfaces/user-service.interface';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: typeof User,
  ) {}

  async createUser(user: IUser): Promise<IUser> {
    return await this.userRepo.create<User>(user);
  }

  async findById(id: number): Promise<IUser | null> {
    const result = await this.userRepo.findByPk(id);
    return !result ? null : result;
  }

  async findByUsername(username: string): Promise<IUser | null> {
    const result = await this.userRepo.findOne<User>({
      where: { username: username },
    });
    return !result ? null : result;
  }

  async findByEmail(email: string): Promise<IUser> {
    const result = await this.userRepo.findOne<User>({
      where: { email: email },
    });
    return !result ? null : result;
  }

  async findAll(): Promise<Array<IUser> | []> {
    return await this.userRepo.findAll();
  }

  async updateUser(id: number, updatedUser: IUser): Promise<IUser> {
    const user = await this.userRepo.findByPk(id);

    if (!user) return null;

    await user.update(updatedUser);
    return user;
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.userRepo.findByPk(id);
    if (!user) return false;

    await user.destroy();
    return true;
  }
}
