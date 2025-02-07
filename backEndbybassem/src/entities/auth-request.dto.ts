import { IsString, IsNotEmpty } from 'class-validator';

export class AuthRequest {
  @IsString()
  @IsNotEmpty()
  username: string='';

  @IsString()
  @IsNotEmpty()
  password: string='';
}