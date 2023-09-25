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

@ApiTags('Team')
@Controller('teams')
export class TeamController {
  constructor(
    @Inject(ITeamService) private readonly teamService: ITeamService,
  ) {}

  @Post()
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

  @Put(':id/update')
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
