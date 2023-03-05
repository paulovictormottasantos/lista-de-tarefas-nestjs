import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/create/:accountId')
  async createTask(
    @Param('accountId') accountId: string,
    @Body() task: CreateTaskDto,
  ) {
    return await this.tasksService.createTask(accountId, task);
  }
}
