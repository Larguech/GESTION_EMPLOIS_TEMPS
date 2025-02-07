import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthDto } from './auth.dto';
import { AuthResponse } from './auth.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) 
    private usersRepository: Repository<User>,
  ) {}

  async login(authDto: AuthDto): Promise<AuthResponse> {
    const user = await this.usersRepository.findOne({
      where: { username: authDto.username },
    });
    // console.log('Mot de passe fourni (en clair) :', bcrypt.hashSync('admin1', 10), '=====>',authDto.password);
    // console.log('Mot de passe haché dans la base de données :', user?.password);
    if (!user || !bcrypt.compareSync(authDto.password, user.password)) {
      return new AuthResponse('', false, '', 0, '', false, false);
    }

    const token = this.jwtService.sign({ id: user.id, username: user.username });

    return new AuthResponse(
      token,
      user.admin,
      user.nom,
      user.id,
      user.prenom,
      user.enseignant,
      true,
    );
  }

  logout(userId: number): boolean {
    console.log(`User with ID ${userId} has logged out.`);
    return true;
  }
}