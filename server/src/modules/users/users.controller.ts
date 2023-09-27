import {
  UseGuards,
  Controller,
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
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(IUserService) private readonly userService: IUserService,
  ) {}

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({
    description: 'Resource not found: User was not found',
  })
  async findUser(@Param('id') id: number): Promise<IUser> {
    const user = await this.userService.findById(+id);

    if (!user)
      throw new NotFoundException(`User was not found with ID :: ${id}`);

    return user;
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({
    description: 'Resource not found: Users were not found',
  })
  async findUsers(): Promise<Array<IUser>> {
    const users = await this.userService.findAll();

    if (!users || users.length === 0)
      throw new NotFoundException(`There are currently no Users existing!`);

    return users;
  }

  @Put(':id/update')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const updatedUser = await this.userService.updateUser(+id, updateUserDto);

    if (!updatedUser) throw new NotFoundException('User was not found!');

    return updatedUser;
  }

  @Delete(':id/delete')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  remove(@Param('id') id: number): Promise<boolean> {
    const deleted = this.userService.deleteUser(+id);

    if (!deleted)
      throw new ConflictException(`Could not delete user with ID :: ${id}`);

    return deleted;
  }
}
