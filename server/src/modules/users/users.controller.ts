import {
  Controller,
  Post,
  Body,
  Inject,
  Param,
  Put,
  Logger,
  NotFoundException,
  Delete,
  Get,
  ConflictException,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { IUserService } from './interfaces/user-service.interface';
import { ICreateUserDto } from './interfaces/dto/create-user.dto';
import { IUpdateUserDto } from './interfaces/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(IUserService) private readonly userService: IUserService,
  ) {}

  @Post('create')
  async createUser(@Body() createUserDto: ICreateUserDto): Promise<IUser> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async findUser(@Param('id') id: number): Promise<IUser> {
    const user = await this.userService.findById(+id);

    if (!user)
      throw new NotFoundException(`User was not found with ID :: ${id}`);

    return user;
  }

  @Get()
  async findUsers(): Promise<Array<IUser>> {
    const users = await this.userService.findAll();

    if (!users || users.length === 0)
      throw new NotFoundException(`There are currently no Users existing!`);

    return users;
  }

  @Put(':id/update')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: IUpdateUserDto,
  ): Promise<IUser> {
    const updatedUser = await this.userService.updateUser(+id, updateUserDto);

    if (!updatedUser) throw new NotFoundException('User was not found!');

    return updatedUser;
  }

  @Delete(':id/delete')
  remove(@Param('id') id: number): Promise<boolean> {
    const deleted = this.userService.deleteUser(+id);

    if (!deleted)
      throw new ConflictException(`Could not delete user with ID :: ${id}`);

    return deleted;
  }
}
