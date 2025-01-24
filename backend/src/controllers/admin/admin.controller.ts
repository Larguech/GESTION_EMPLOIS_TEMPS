import { Controller, Get } from '@nestjs/common';
import { Admin } from 'src/enttities/Admin';
import { Person } from 'src/enttities/Person';
import { Roles } from 'src/guard/roles-decorator';
import { UserRepository } from 'src/Repository/UserRepository';
import { AdminService } from 'src/services/dmin/dmin.service';

@Controller('api/admin')
export class AdminController {
    constructor(private adminservice:UserRepository){}
    @Get()
    @Roles('ADMIN')
    public getadmin():Promise<Person[]>{
        return this.adminservice.find()
    }
}
