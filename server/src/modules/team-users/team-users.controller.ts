import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  UnprocessableEntityException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ITeamUserService } from './interfaces/team-user-service.interface';
import { CreateTeamUserDto } from './dto/create-team-user.dto';
import { UpdateTeamUserDto } from './dto/update-team-user.dto';
import { ITeamUser } from './interfaces/team-user.interface';
import { IUser } from '../users/interfaces/user.interface';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('TeamUser')
@Controller('team-users')
export class TeamUserController {
  constructor(
    @Inject(ITeamUserService)
    private readonly teamUserService: ITeamUserService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ description: 'Created new TeamUser Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async create(
    @Body() createTeamUserDto: CreateTeamUserDto,
  ): Promise<ITeamUser> {
    const teamUser =
      await this.teamUserService.createTeamUser(createTeamUserDto);
    if (!teamUser)
      throw new UnprocessableEntityException('Could not create new Team User');
    return teamUser;
  }

  @Get('user/:userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found: user has no teams' })
  async findTeamsByUserId(
    @Param('userId') userId: number,
  ): Promise<Array<ITeamUser>> {
    const teams = await this.teamUserService.findTeamsByUserId(userId);
    if (!teams) throw new NotFoundException('This user has no teams');
    return teams;
  }

  @Get('team/:teamId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found: team has no users' })
  async findUsersByTeamId(
    @Param('teamId') teamId: number,
  ): Promise<Array<IUser>> {
    // Find users in a given team
    const users = await this.teamUserService.findUsersByTeamId(teamId);
    if (!users) throw new NotFoundException('This team had no users');
    return users;
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async update(
    @Param('id') id: number,
    @Body() updateTeamUserDto: UpdateTeamUserDto,
  ): Promise<ITeamUser> {
    const updatedTeamUser = await this.teamUserService.updateTeamUser(
      +id,
      updateTeamUserDto,
    );
    if (!updatedTeamUser)
      throw new UnprocessableEntityException('Could not update the team user');
    return updatedTeamUser;
  }

  @Delete('/team/:teamId/user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was deleted successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async remove(
    @Param('teamId') teamId: number,
    @Param('userId') userId: number,
  ): Promise<boolean> {
    const deleted = await this.teamUserService.removeUserFromTeam(
      teamId,
      userId,
    );
    if (!deleted)
      throw new UnprocessableEntityException('Could not delete user from team');
    return true;
  }
}
