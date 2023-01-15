import { ReadableCode } from '@app/modules/readable-code/domain/contracts/readable-code.entity';
import { ExecutionResult } from '@app/shared/contracts/responses/execution-result';
import { generation } from '@app/shared/generation';

export class CreateReadableCodeCommand {
  constructor() {}

  public async execute(
    originalTransactionId: string,
  ): Promise<ExecutionResult> {
    const readableCode = generation();
  }

  /* @todo
    const readableCode = await this.readableCodeRepository.findOne({
      where: { originalTransactionId },
    });

    if (readableCode) {
      throw new NotFoundException(
        `A Readable Code already exists for this Transaction (${originalTransactionId}) was found`,
      );
    }

    const createdAt = this.formatDate(readableCode.createdAt);
    const updatedAt = this.formatDate(readableCode.updatedAt);

    return {
      data: {
        readableCode: { ...readableCode, createdAt, updatedAt },
      },
    };
    */
}
