import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusEnum } from './enums/task-status.enum';
import { FilterDto } from './dto/filter.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(
    filterDto: FilterDto,
    user: UserEntity,
  ): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: UserEntity): Promise<TaskEntity> {
    const foundedTask = await this.taskRepository.findOne({ id, user });
    if (!foundedTask) {
      throw new NotFoundException(`Task with id ${id} doesnt exists`);
    }
    return foundedTask;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: string, user: UserEntity) {
    const deleteResult = await this.taskRepository.delete({ id, user });
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Noting to delete`);
    }
  }

  async updateTaskStatusById(
    id: string,
    status: TaskStatusEnum,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const task: TaskEntity = await this.getTaskById(id, user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
