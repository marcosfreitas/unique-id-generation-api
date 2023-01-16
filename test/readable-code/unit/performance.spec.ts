import { readableCodeGeneration } from '@app/shared/domain/readable-code-generation';
import { Logger } from '@nestjs/common';

describe('When generating a Readable Code', () => {
  it('should generate a readable code fast', () => {
    const t0 = performance.now();

    readableCodeGeneration();

    const t1 = performance.now();

    Logger.debug(`Generation of 1 code took ${t1 - t0} milliseconds.`);

    expect(t1 - t0).toBeLessThan(0.05);
  });
});
