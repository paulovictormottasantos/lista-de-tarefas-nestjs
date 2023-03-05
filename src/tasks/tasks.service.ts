import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask(accountId: string, task: CreateTaskDto) {
    const foundAccount = await this.prismaService.account.findUnique({
      where: {
        id: accountId,
      },
    });

    if (!foundAccount) {
      throw new HttpException('Account not found.', HttpStatus.NOT_FOUND);
    }

    const createdTask = await this.prismaService.task.create({
      data: {
        content: task.content,
        accountId,
      },
    });

    if (!createdTask) {
      throw new HttpException(
        'Task not created.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    throw new HttpException('Task successfully created.', HttpStatus.CREATED);
  }

  async findTasks(accountId: string) {
    const foundAccount = await this.prismaService.account.findUnique({
      where: {
        id: accountId,
      },
    });

    if (!foundAccount) {
      throw new HttpException('Account not found.', HttpStatus.NOT_FOUND);
    }

    const foundTasks = await this.prismaService.task.findMany({
      where: {
        accountId,
      },
    });

    return foundTasks;
  }

  async updateTask(taskId: string, task: UpdateTaskDto) {
    const foundTask = await this.prismaService.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!foundTask) {
      throw new HttpException('Task not found.', HttpStatus.NOT_FOUND);
    }

    const updatedTask = await this.prismaService.task.update({
      where: {
        id: taskId,
      },
      data: {
        content: task.content,
        finished: task.finished,
      },
    });

    if (!updatedTask) {
      throw new HttpException(
        'Task not updated.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    throw new HttpException('Task successfully updated.', HttpStatus.OK);
  }
}
