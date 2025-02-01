import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthDto } from './auth.dto';
import { AuthResponse } from './auth.response';

@Injectable()
export class AuthService {
  private users = [
    { id: 1, username: 'admin', password: bcrypt.hashSync('admin', 10), isAdmin: true, nom: 'Larguech', prenom: 'Ossama', isEnseignant: false }
  ];

  constructor(private jwtService: JwtService) {}


  async login(authDto: AuthDto): Promise<AuthResponse> {
    const user = this.users.find(u => u.username === authDto.username);
    if (!user || !bcrypt.compareSync(authDto.password, user.password)) {
      return new AuthResponse('', false, '', 0, '', false, false);
    }

    const token = this.jwtService.sign({ id: user.id, username: user.username });

    return new AuthResponse(token, user.isAdmin, user.nom, user.id, user.prenom, user.isEnseignant, true);
  }
  logout(userId: number): boolean {
   
    console.log(`User with ID has logged out.`);
    return true; 
  }
  
}
