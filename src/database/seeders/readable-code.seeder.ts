import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ReadableCode } from '@app/modules/readable-code/domain/contracts/readable-code.entity';

export default class UserSeeder implements Seeder {
  public async run(
    _dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const readableCodeFactory = factoryManager.get(ReadableCode);
    await readableCodeFactory.saveMany(5);
  }
}
