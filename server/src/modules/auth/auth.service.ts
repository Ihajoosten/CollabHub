import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICreateUserDto } from '../users/interfaces/dto/create-user.dto.interface';
import { ILoginUserDto } from './interfaces/dto/login-user.dto.';
import { IUserService } from '../users/interfaces/user-service.interface';
import { IAuthService } from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserService) private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(
    loginUserDto: ILoginUserDto,
  ): Promise<{ token: string } | null> {
    const userModel = (await this.userService.findByEmail(
      loginUserDto.username,
    )) as User;
    const payload = {
      id: userModel.id,
      firstname: userModel.firstname,
      lastname: userModel.lastname,
      username: userModel.username,
      email: userModel.email,
    };
    const token = await this.generateToken(payload);
    return !token ? null : { token: token };
  }

  public async register(createUserDto: ICreateUserDto): Promise<boolean> {
    // hash the password
    const pass = await this.hashPassword(createUserDto.password);

    // create the user
    const newUser = await this.userService.createUser({
      ...createUserDto,
      password: pass,
    });

    // return if the user is registered
    return !newUser ? false : true;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    // find if user exist with this email
    const user = await this.userService.findByEmail(username);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = user['dataValues'];
    return result;
  }

  private async generateToken(payload: any) {
    return await this.jwtService.signAsync(payload);
  }

  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
