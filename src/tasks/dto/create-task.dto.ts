import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    title: 'Title',
    description: 'Task title',
    example: 'Clean room',
    required: true,
    maxLength: 30,
    minLength: 1,
  })
  title: string;

  @ApiProperty({
    title: 'Description',
    description: 'Task description',
    example: 'Some desc',
    required: false,
    nullable: true,
    maxLength: 1000,
  })
  description: string;
}
