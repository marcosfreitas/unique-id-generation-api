import request from 'supertest-as-promised';
import { Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ReadableCode } from '@app/modules/readable-code/domain/contracts/readable-code.entity';
import { AppModule } from '@app/app.module';
import { ConfigService } from '@nestjs/config';
import { fail } from 'assert';

describe('/v1/readable-codes (GET) - when retrieving a Transaction`s Readable Code', () => {
  let app: INestApplication;
  let readableCodeRepository: Repository<ReadableCode>;
  let configService: ConfigService;

  beforeAll(async () => {
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
  });

  beforeEach(async () => {
    await readableCodeRepository.delete({});
  });

  afterAll(async () => {
    await readableCodeRepository.delete({});
    await app.close();
  });

  describe('and is sent a request without params', () => {
    it('should return BAD_REQUEST response with a body of missing params', async () => {
      const expectedResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['originalTransactionId should not be empty'],
        error: 'Bad Request',
      };

      await request(app.getHttpServer())
        .get('/v1/readable-codes')
        .query({})
        .expect(HttpStatus.BAD_REQUEST)
        .expect(expectedResponse);
    });
  });

  describe('and is sent a request with originalTransactionId empty', () => {
    it('should return BAD_REQUEST response', async () => {
      const expectedResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['originalTransactionId should not be empty'],
        error: 'Bad Request',
      };

      await request(app.getHttpServer())
        .get('/v1/readable-codes')
        .query({
          originalTransactionId: '',
        })
        .expect(HttpStatus.BAD_REQUEST)
        .expect(expectedResponse);
    });
  });

  describe('and is sent a valid request', () => {
    describe('but there is no readable code for the given transaction id', () => {
      it('should return NOT_FOUND response', async () => {
        const originalTransactionId = '_no_existent_';

        const expectedResponse = {
          statusCode: HttpStatus.NOT_FOUND,
          message: `No Readable Code has been found for this Transaction (${originalTransactionId})`,
          error: 'Not Found',
        };

        await request(app.getHttpServer())
          .get('/v1/readable-codes')
          .query({
            originalTransactionId,
          })
          .expect(HttpStatus.NOT_FOUND)
          .expect(expectedResponse);
      });
    });

    describe('should return a successful response', () => {
      it('... with the existent readable code', async () => {
        const originalTransactionId = Math.floor(Math.random() * 1000);

        // creating
        await request(app.getHttpServer())
          .post('/v1/readable-codes')
          .send({
            originalTransactionId,
          })
          .expect(HttpStatus.CREATED);

        // retrieving
        const response = await request(app.getHttpServer())
          .get('/v1/readable-codes')
          .query({
            originalTransactionId,
          })
          .expect(HttpStatus.OK);

        expect(response).toBeTruthy();

        expect(response.body).toHaveProperty('data');

        expect(response.body.data).toHaveProperty('code');
        expect(response.body.data.code).not.toBeNull();

        expect(response.body.data).toHaveProperty('originalTransactionId');
        expect(response.body.data.originalTransactionId).not.toBeNull();

        expect(response.body.data).toHaveProperty('createdAt');
        expect(response.body.data.createdAt).not.toBeNull();

        expect(response.body.data).toHaveProperty('updatedAt');
        expect(response.body.data.createdAt).not.toBeNull();
      });

      it('... for multiple parallel requests', async () => {
        await readableCodeRepository.delete({});

        await request(app.getHttpServer())
          .post('/v1/readable-codes')
          .send({
            originalTransactionId: 123,
          })
          .expect(HttpStatus.CREATED);

        const doRequest = async (index) => {
          try {
            await request(app.getHttpServer())
              .get('/v1/readable-codes')
              .query({
                originalTransactionId: 123,
              })
              .expect(HttpStatus.OK);
          } catch (e) {
            console.log(e);
            fail('Unexpected error');
          }
        };

        const ids = Array(500).fill(undefined);

        await Promise.all(ids.map(async (_val, index) => doRequest(index)));
      });
    });
  });
});
