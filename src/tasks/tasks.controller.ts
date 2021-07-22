import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusEnum } from './enums/task-status.enum';
import { FilterDto } from './dto/filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../auth/entity/user/user.entity';
import { GetUser } from '../auth/decorator/create-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  async getTasks(@Query() filterDto: FilterDto, @GetUser() user: UserEntity) {
    return this.taskService.getTasks(filterDto, user);
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string, @GetUser() user: UserEntity) {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: UserEntity,
  ) {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Delete()
  async deleteTaskById(@Body('id') id: string, @GetUser() user: UserEntity) {
    return this.taskService.deleteTaskById(id, user);
  }

  @Patch(':id/status')
  async updateTaskStatusById(
    @Param('id') id: string,
    @Body('status') status: TaskStatusEnum,
    @GetUser() user: UserEntity,
  ) {
    return this.taskService.updateTaskStatusById(id, status, user);
  }
}
