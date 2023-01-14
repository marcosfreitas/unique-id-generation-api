import { Controller, Get, Param } from '@nestjs/common';
import { IsOptional } from 'class-validator';
import { GetReadableCodeCommand } from '../../domain/commands/get-readable-code.command';

@Controller('v1/readable-codes')
export class GetReadableCodeController {
  constructor(
    private readonly getReadableCodeCommand: GetReadableCodeCommand,
  ) {}

  @Get('/')
  public async list() {
    return [];
  }

  @Get(':originalTransactionID')
  @IsOptional()
  public async get(
    @Param('originalTransactionID') originalTransactionID: string,
  ) {
    return this.getReadableCodeCommand.execute(originalTransactionID);
  }
}
