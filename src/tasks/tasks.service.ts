import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async getAllTasks(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    const foundedTask = await this.taskRepository.findOne(id);
    if (!foundedTask) {
      throw new NotFoundException(`Task with id ${id} doesnt exists`);
    }
    return foundedTask;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({ title, description });
    await this.taskRepository.save(task);
    return task;
  }
}
