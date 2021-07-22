import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatusEnum } from './enums/task-status.enum';
import { UserEntity } from '../user/user.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30, nullable: false })
  title: string;

  @Column({ length: 1000, nullable: true })
  description: string;

  @Column({ enum: TaskStatusEnum })
  status: TaskStatusEnum;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { eager: false })
  user: UserEntity;
}
