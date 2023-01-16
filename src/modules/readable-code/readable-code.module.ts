import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadableCodeController } from './application/controllers/readable-code.controller';
import { CreateReadableCodeCommand } from './domain/commands/create-readable-code.command';
import { GetReadableCodeCommand } from './domain/commands/get-readable-code.command';
import { ReadableCode } from './domain/contracts/readable-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReadableCode])],
  providers: [CreateReadableCodeCommand, GetReadableCodeCommand],
  controllers: [ReadableCodeController],
  exports: [TypeOrmModule],
})
export class ReadableCodeModule {}
