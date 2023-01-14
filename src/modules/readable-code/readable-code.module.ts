import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetReadableCodeController } from './application/controllers/readable-code.controller';
import { GetReadableCodeCommand } from './domain/commands/get-readable-code.command';
import { ReadableCode } from './domain/contracts/readable-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReadableCode])],
  providers: [GetReadableCodeCommand],
  controllers: [GetReadableCodeController],
  exports: [TypeOrmModule],
})
export class ReadableCodeModule {}
