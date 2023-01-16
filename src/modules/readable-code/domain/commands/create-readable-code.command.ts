import { ReadableCode } from '@app/modules/readable-code/domain/contracts/readable-code.entity';

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ExecutionResult } from '@shared/domain/contracts/responses/execution-result';
import { Repository } from 'typeorm';
import { readableCodeGeneration } from '@app/shared/domain/readable-code-generation';

@Injectable()
export class CreateReadableCodeCommand {
  constructor(
    @InjectRepository(ReadableCode)
    protected readableCodeRepository: Repository<ReadableCode>,
    protected configService: ConfigService,
  ) {}

  public async execute(
    originalTransactionId: string,
  ): Promise<ExecutionResult> {
    const alreadyExistsCode = await this.readableCodeRepository.findOne({
      where: { originalTransactionId },
    });

    if (alreadyExistsCode) {
      throw new ConflictException(
        `A Readable Code already exists for this Transaction (${originalTransactionId})`,
      );
    }

    const entity = this.readableCodeRepository.create();

    entity.code = await this.getReadableCode();
    entity.originalTransactionId = originalTransactionId;

    const readableCode = await this.readableCodeRepository.save(entity);

    return {
      data: readableCode.toResponse(),
    };
  }

  private async getReadableCode(
    codeLengthOverridden?: number,
  ): Promise<string> {
    let code = '';
    let isDuplicatedReadableCode = true;
    const maxRuns = 100;

    let codeLength =
      codeLengthOverridden || this.configService.get('uniqueId.codeLength');

    for (let i = 1; i <= maxRuns; i++) {
      code = readableCodeGeneration(codeLength);
      isDuplicatedReadableCode = await this.isDuplicatedReadableCode(code);

      if (!isDuplicatedReadableCode) {
        return code;
      }

      if (i === maxRuns) {
        codeLength += 1;
        Logger.error(
          `A unique Readable Code was generated with the length ${codeLength} due the quantity of duplicated results. ` +
            ' The default code length should be increased on Env var CODE_LENGTH.',
        );
        return this.getReadableCode(codeLength);
      }
    }
  }

  private async isDuplicatedReadableCode(code: string): Promise<boolean> {
    const alreadyExistsCode = await this.readableCodeRepository.findOne({
      where: { code },
    });

    return !!alreadyExistsCode;
  }
}
