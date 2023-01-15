import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';

/**
 * User's model and entity definition.
 */
@Entity({ name: 'transaction-readable-codes' })
export class ReadableCode {
  /**
   * Defined as string because number is not compatible with bigint in postgresql
   */
  @PrimaryColumn({ type: 'bigint' })
  @Generated('increment')
  id: string;

  @Column()
  readableCode: string;

  @Column()
  originalTransactionId: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;

  constructor(readableCode: string, originalTransactionId: string) {
    this.readableCode = readableCode;
    this.originalTransactionId = originalTransactionId;
  }
}
