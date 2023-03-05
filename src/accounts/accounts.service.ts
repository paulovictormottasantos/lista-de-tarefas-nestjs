import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from './dtos/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAccount(account: CreateAccountDto): Promise<HttpException> {
    const foundAccount = await this.prismaService.account.findUnique({
      where: {
        username: account.username,
      },
    });

    if (foundAccount) {
      throw new HttpException('Username already exists.', HttpStatus.CONFLICT);
    }

    const createdAccount = await this.prismaService.account.create({
      data: {
        name: account.name,
        username: account.username,
        password: account.password,
      },
    });

    if (!createdAccount) {
      throw new HttpException(
        'Account not created.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    throw new HttpException(
      'Account successfully created.',
      HttpStatus.CREATED,
    );
  }
}
