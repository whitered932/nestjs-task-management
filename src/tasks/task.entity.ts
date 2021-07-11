import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatusEnum } from './enums/task-status.enum';

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
}
