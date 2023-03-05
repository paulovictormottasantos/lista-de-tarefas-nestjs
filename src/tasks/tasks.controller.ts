import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/create/:accountId')
  async createTask(
    @Param('accountId') accountId: string,
    @Body() task: CreateTaskDto,
  ): Promise<HttpException> {
    return await this.tasksService.createTask(accountId, task);
  }

  @Get('/find/:accountId')
  async findTasks(@Param('accountId') accountId: string): Promise<Task[]> {
    return await this.tasksService.findTasks(accountId);
  }

  @Patch('/update/:taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() task: UpdateTaskDto,
  ): Promise<HttpException> {
    return await this.tasksService.updateTask(taskId, task);
  }

  @Delete('/delete/:taskId')
  async deleteTask(@Param('taskId') taskId: string): Promise<HttpException> {
    return await this.tasksService.deleteTask(taskId);
  }
}
