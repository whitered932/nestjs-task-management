import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusEnum } from './enums/task-status.enum';

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
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatusEnum.OPEN,
    });
    await this.taskRepository.save(task);
    return task;
  }

  async deleteTaskById(id: string) {
    const deleteResult = await this.taskRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Noting to delete`);
    }
  }

  async updateTaskStatusById(
    id: string,
    status: TaskStatusEnum,
  ): Promise<TaskEntity> {
    const task: TaskEntity = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
