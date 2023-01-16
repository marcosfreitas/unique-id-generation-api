import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateReadableCodeCommand } from '../../domain/commands/create-readable-code.command';
import { GetReadableCodeCommand } from '../../domain/commands/get-readable-code.command';
import { ReadableCodeRequest } from '../../domain/contracts/create-readable-code.request';

@Controller('v1/readable-codes')
export class ReadableCodeController {
  constructor(
    private readonly createReadableCodeCommand: CreateReadableCodeCommand,
    private readonly getReadableCodeCommand: GetReadableCodeCommand,
  ) {}

  @Get()
  public async list(
    @Query()
    request: ReadableCodeRequest,
  ) {
    return this.getReadableCodeCommand.execute(request.originalTransactionId);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() request: ReadableCodeRequest) {
    return this.createReadableCodeCommand.execute(
      request.originalTransactionId,
    );
  }
}
