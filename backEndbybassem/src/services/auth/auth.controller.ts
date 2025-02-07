import { Controller, Post, Body , Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { AuthResponse } from './auth.response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto): Promise<AuthResponse> {
    return this.authService.login(authDto);
  }
  @Get('logout/:id')
logout(@Param('id') userId: number): boolean {
  return this.authService.logout(userId);
}

}
