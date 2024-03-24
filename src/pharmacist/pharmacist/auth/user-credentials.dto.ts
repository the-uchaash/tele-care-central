

import { IsNotEmpty, IsString } from 'class-validator';

export class UserCredentialsDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
