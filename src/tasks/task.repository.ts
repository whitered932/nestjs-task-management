import { EntityRepository, Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { FilterDto } from './dto/filter.dto';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async getTasks(filterDto: FilterDto) {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search',
        { search: `%${search}%` },
      );
    }
    return query.getMany();
  }
}
