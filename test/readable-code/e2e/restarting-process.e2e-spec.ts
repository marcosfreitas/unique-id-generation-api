import request from 'supertest-as-promised';
import { Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import {
  HttpStatus,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ReadableCode } from '@app/modules/readable-code/domain/contracts/readable-code.entity';
import { AppModule } from '@app/app.module';
import { ConfigService } from '@nestjs/config';

let app: INestApplication;
let readableCodeRepository: Repository<ReadableCode>;
let configService: ConfigService;

const startApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  readableCodeRepository = app.get(getRepositoryToken(ReadableCode));
  configService = app.get(ConfigService);

  await app.init();
};

describe('/v1/readable-codes (POST) - Restarted service - when creating a Readable Code', () => {
  beforeAll(async () => await startApp());

  beforeEach(async () => {
    await readableCodeRepository.delete({});
  });

  afterAll(async () => {
    await readableCodeRepository.delete({});
    await app.close();
  });

  describe('and is sent a valid request', () => {
    describe('should return a successful response', () => {
      let firstCode = '';

      it('... with the first readable code created', async () => {
        const response = await request(app.getHttpServer())
          .post('/v1/readable-codes')
          .send({
            originalTransactionId: '8888',
          })
          .expect(HttpStatus.CREATED);

        firstCode = response.body.data.code as unknown as string;

        expect(firstCode).toBeTruthy();
      });

      it('... with the created code', async () => {
        await app.close();
        await startApp();

        const response = await request(app.getHttpServer())
          .post('/v1/readable-codes')
          .send({
            originalTransactionId: '9999',
          })
          .expect(HttpStatus.CREATED);

        expect(response.body.data.code).toBeTruthy();
        expect(response.body.data.code).not.toBe(firstCode);
      });
    });
  });
});
