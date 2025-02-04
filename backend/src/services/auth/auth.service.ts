import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Person } from 'src/enttities/Person';
import { EnseignantRepository } from 'src/Repository/EnseignantRepository';
import { UserRepository } from 'src/Repository/UserRepository';
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
                private readonly userRepository:UserRepository,
                private readonly enseignantRepository:EnseignantRepository
    ) {}

    // Validate user credentials and set isAuthentificated to true
  async validateUser(login: string, password: string): Promise<any> {
    // Check in userRepository (for admin)
  let user = await this.userRepository.findOne({
    where: { login },
  });

  // If not found in userRepository, check in enseignantRepository
  if (!user) {
    user = await this.enseignantRepository.findOne({
      where: { login },
    });
  }
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
  
    // Generate the JWT token
    const token = this.jwtService.sign(payload);
  
    // Construct the response JSON object
    return {
      authentificated:user.isAuthentificated,
      token: token,
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        admin: user.Role === 'ADMIN',
        enseignant: user.Role === 'PROF',
      },
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
