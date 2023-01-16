import { IsDefined, IsNumber, IsPositive } from 'class-validator';

export class UniqueIdConfig {
  @IsDefined()
  @IsNumber()
  @IsPositive()
  public readonly codeLength: number;
}
