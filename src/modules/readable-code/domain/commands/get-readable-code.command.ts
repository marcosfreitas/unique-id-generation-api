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
        `No Readable Code for this Transaction (${originalTransactionId}) was found`,
      );
    }

    const createdAt = this.formatDate(readableCode.createdAt);
    const updatedAt = this.formatDate(readableCode.updatedAt);

    return {
      data: {
        readableCode: { ...readableCode, createdAt, updatedAt },
      },
    };
  }

  private formatDate(date: Date): string {
    const month = new Intl.DateTimeFormat('en-US', {
      month: 'long',
    }).format(date);
    const day = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
    }).format(date);
    const year = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
    }).format(date);

    return `${month} ${day}, ${year}`;
  }
}
