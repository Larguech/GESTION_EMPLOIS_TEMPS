import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Person } from 'src/enttities/Person';
import { UserRepository } from 'src/Repository/UserRepository';
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
                private readonly userRepository:UserRepository
    ) {}

    // Validate user credentials and set isAuthentificated to true
  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { login },
    });
    console.log(user)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update isAuthentificated to true
    user.isAuthentificated = true;
    await this.userRepository.save(user);

    return user;
  }

  // Generate JWT token for the authenticated user
  async login(user: Person) {
    const payload = { username: user.login, sub: user.id, Role: user.Role };
    return {
      access_token: this.jwtService.sign(payload),
      
    };
  }

  // Handle logout by setting isAuthentificated to false
  async logout(login: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { login } });
    if (user) {
      user.isAuthentificated = false;
      await this.userRepository.save(user);
    }
  }
}
