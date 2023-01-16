import { ReadableCode } from '@app/modules/readable-code/domain/contracts/readable-code.entity';

import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ExecutionResult } from '@shared/domain/contracts/responses/execution-result';
import { Repository } from 'typeorm';

@Injectable()
export class GetReadableCodeCommand {
  constructor(
    @InjectRepository(ReadableCode)
    protected readableCodeRepository: Repository<ReadableCode>,
    protected configService: ConfigService,
  ) {}

  public async execute(
    originalTransactionId: string,
  ): Promise<ExecutionResult> {
    const readableCode = await this.readableCodeRepository.findOne({
      where: { originalTransactionId },
    });

    if (!readableCode) {
      throw new NotFoundException(
        `No Readable Code has been found for this Transaction (${originalTransactionId})`,
      );
    }

    return {
      data: readableCode.toResponse(),
    };
  }
}
