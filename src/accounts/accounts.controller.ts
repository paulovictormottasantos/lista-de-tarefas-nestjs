import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dtos/create-account.dto';

@Controller('account')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('/create')
  async createAccount(
    @Body() account: CreateAccountDto,
  ): Promise<HttpException> {
    return await this.accountsService.createAccount(account);
  }
}
