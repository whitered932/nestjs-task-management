import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
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
}
