import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableIndex,
} from 'typeorm';

export class CreateTransactionReadableCodesTable1659100456118
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transaction-readable-codes',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isUnique: true,
            unsigned: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
            comment: 'Readable Code primary ID that should help in indexing',
          }),
          new TableColumn({
            name: 'code',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
            comment: 'Readable Code that belongs to an existent transaction ID',
          }),
          new TableColumn({
            name: 'originalTransactionId',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
            comment: 'Transaction ID that owns this Readable Code',
          }),
          new TableColumn({
            name: 'createdAt',
            type: 'datetime',
            default: 'now()',
            isNullable: false,
          }),
          new TableColumn({
            name: 'updatedAt',
            type: 'datetime',
            default: 'now()',
            isNullable: false,
          }),
        ],
        indices: [
          new TableIndex({
            name: 'idx_code',
            columnNames: ['code'],
            isFulltext: true,
          }),
          new TableIndex({
            name: 'idx_original_transaction_id',
            columnNames: ['originalTransactionId'],
            isFulltext: true,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transaction-readable-codes');
  }
}
