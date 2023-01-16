import { Type } from 'class-transformer';
import { isDefined, IsDefined, ValidateNested } from 'class-validator';

import { AppConfig } from './app.config';
import { DatabaseConfig } from './database.config';
import { PaginationConfig } from './pagination.config';
import { UniqueIdConfig } from './unique-id.config';

export class GlobalConfig {
  @IsDefined()
  public readonly application: AppConfig;

  @ValidateNested()
  @Type(() => DatabaseConfig)
  @IsDefined()
  public database: DatabaseConfig;

  @IsDefined()
  public uniqueId: UniqueIdConfig;

  @IsDefined()
  public pagination: PaginationConfig;
}
