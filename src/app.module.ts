import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../ormconfig-nest';

import { configLoader } from './configuration/config-loader';
import { validate } from './configuration/config-validator';
import { ReadableCodeModule } from './modules/readable-code/readable-code.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoader],
      validate,
    }),

    TypeOrmModule.forRootAsync(config),

    ReadableCodeModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {
  // const dataSourceInstance = new DataSource(dataSource);
  // await dataSourceInstance.initialize();
  // await runSeeders(dataSourceInstance);
}
