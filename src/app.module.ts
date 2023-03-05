import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AccountsModule } from './accounts/accounts.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [PrismaModule, AccountsModule, TasksModule],
})
export class AppModule {}
