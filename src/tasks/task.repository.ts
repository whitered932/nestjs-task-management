import { EntityRepository, Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { FilterDto } from './dto/filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusEnum } from './enums/task-status.enum';
import { UserEntity } from '../auth/entity/user/user.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async createTask(createTaskDto: CreateTaskDto, user: UserEntity) {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      user,
      status: TaskStatusEnum.OPEN,
    });
    await this.save(task);
    return task;
  }

  async getTasks(filterDto: FilterDto, user: UserEntity) {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search)',
        { search: `%${search}%` },
      );
    }
    return query.getMany();
  }
}
