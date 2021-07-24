import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatusEnum } from './enums/task-status.enum';
import { UserEntity } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class TaskEntity {
  @ApiProperty({
    type: 'string',
    nullable: false,
    title: 'UUID',
    description: 'Task uuid',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: 'string',
    nullable: false,
    title: 'Title',
    description: 'Task title',
    maxLength: 30,
    required: true,
  })
  @Column({ length: 30, nullable: false })
  title: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
    title: 'Description',
    description: 'Task description',
    maxLength: 1000,
    required: false,
  })
  @Column({ length: 1000, nullable: true })
  description: string;

  @ApiProperty({
    nullable: false,
    title: 'Status',
    description: 'Task status',
    required: true,
    enum: TaskStatusEnum,
  })
  @Column({ enum: TaskStatusEnum })
  status: TaskStatusEnum;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { eager: false })
  user: UserEntity;
}
