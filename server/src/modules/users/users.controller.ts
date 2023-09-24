import {
  Controller,
  Post,
  Body,
  Inject,
  Param,
  Put,
  NotFoundException,
  Delete,
  Get,
  ConflictException,
  UsePipes,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { IUserService } from './interfaces/user-service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(IUserService) private readonly userService: IUserService,
  ) { }

  @Post('create')
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    const user = await this.userService.createUser(createUserDto);
    return user;
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
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
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
