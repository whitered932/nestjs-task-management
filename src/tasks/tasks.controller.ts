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

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  async getTasks(@Query() filterDto: FilterDto) {
    return this.taskService.getTasks(filterDto);
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete()
  async deleteTaskById(@Body('id') id: string) {
    return this.taskService.deleteTaskById(id);
  }

  @Patch(':id/status')
  async updateTaskStatusById(
    @Param('id') id: string,
    @Body('status') status: TaskStatusEnum,
  ) {
    return this.taskService.updateTaskStatusById(id, status);
  }
}
