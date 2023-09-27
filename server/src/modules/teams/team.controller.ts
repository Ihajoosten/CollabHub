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
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ITeamService } from './interfaces/team-service.interface';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './team.entity';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { ITeam } from './interfaces/team.interface';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Team')
@Controller('teams')
export class TeamController {
  constructor(
    @Inject(ITeamService) private readonly teamService: ITeamService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ description: 'Created new TeamUser Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async create(@Body() createTeamDto: CreateTeamDto): Promise<ITeam> {
    const team = await this.teamService.createTeam(createTeamDto);
    if (!team)
      throw new UnprocessableEntityException('Could not create new Team');
    return team;
  }

  @Get(':id/fetch')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found: team not found' })
  async findById(@Param('id') teamId: number): Promise<ITeam> {
    const team = await this.teamService.findById(teamId);
    if (!team)
      throw new NotFoundException(
        `This team was not found with ID :: ${teamId}`,
      );
    return team;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({
    description: 'Resource not found: Teams were not found',
  })
  async findTeams(): Promise<Array<ITeam>> {
    const teams = await this.teamService.findAllTeams();

    if (!teams || teams.length === 0)
      throw new NotFoundException(`There are currently no Teams existing!`);

    return teams;
  }

  @Put(':id/update')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async update(
    @Param('id') id: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<ITeam> {
    const updatedTeam = await this.teamService.updateTeam(+id, updateTeamDto);
    if (!updatedTeam)
      throw new UnprocessableEntityException('Could not update the Team');
    return updatedTeam;
  }

  @Delete(':id/delete')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The resource was deleted successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async delete(@Param('id') teamId: number): Promise<boolean> {
    const deleted = await this.teamService.deleteTeam(teamId);
    if (!deleted)
      throw new UnprocessableEntityException('Could not delete Team');
    return true;
  }
}
