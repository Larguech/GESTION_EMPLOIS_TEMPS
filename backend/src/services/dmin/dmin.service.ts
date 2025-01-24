import { Injectable, NotFoundException } from '@nestjs/common';
import { Admin } from 'src/enttities/Admin';
import { UserRepository } from 'src/Repository/UserRepository';

@Injectable()
export class AdminService {
    constructor(
            private userRepository:UserRepository,
            
        ){}
    async addadmin(admin:Admin):Promise<Admin>{
            return this.userRepository.save(admin);
        }
        
}
