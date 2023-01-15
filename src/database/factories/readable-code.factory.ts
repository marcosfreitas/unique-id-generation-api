import { setSeederFactory } from 'typeorm-extension';
import { ReadableCode } from '@app/modules/readable-code/domain/contracts/readable-code.entity';
import { randomUUID } from 'crypto';

export default setSeederFactory(ReadableCode, (faker) => {
  return new ReadableCode(randomUUID(), faker.name.firstName());
});
