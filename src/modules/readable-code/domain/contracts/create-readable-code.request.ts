import { IsNotEmpty } from 'class-validator';

export class ReadableCodeRequest {
  @IsNotEmpty()
  originalTransactionId: string;
}
