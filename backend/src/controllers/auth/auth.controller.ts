import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
  async login(@Body() body: { login: string; password: string }) {
    const user = await this.authService.validateUser(body.login, body.password);
    return this.authService.login(user);
  }

  @Post('logout')
  async logout(@Body() body: { login: string }) {
    await this.authService.logout(body.login);
    return { message: 'Logged out successfully' };
  }
}
