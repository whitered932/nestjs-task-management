import { ApiProperty } from '@nestjs/swagger';
import { TaskStatusEnum } from '../enums/task-status.enum';

export class FilterDto {
  @ApiProperty({
    title: 'Task status',
    description: 'Task status',
    required: false,
    example: TaskStatusEnum.DONE,
    deprecated: false,
    enum: TaskStatusEnum,
  })
  status?: string;
  @ApiProperty({
    title: 'Search',
    description: 'Search by description | title',
    required: false,
    deprecated: false,
  })
  search?: string;
}
