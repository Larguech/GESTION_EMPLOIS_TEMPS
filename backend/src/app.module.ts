import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Admin } from './enttities/Admin';
import { Classe } from './enttities/Classe';
import { Departement } from './enttities/Departement';
import { ElementDeModule } from './enttities/ElementDeModule';
import { Enseignant } from './enttities/Enseigniant';
import { Filiere } from './enttities/Filiere';
import { Modul } from './enttities/Module';
import { NonDisponibilite } from './enttities/NonDisponibilite';
import { Person } from './enttities/Person';
import { Salle } from './enttities/Salle';
import { Semestre } from './enttities/Semestre';
import { Employee } from './enttities/Employee';
import { Department } from './enttities/Department';
import { ClasseRepository } from './Repository/ClasseRepository';
import { DepartementRepository } from './Repository/DepartementRepository';
import { ElementDeModuleRepository } from './Repository/ElementModuleRepository';
import { FiliereRepository } from './Repository/FiliereRepository';
import { ModuleRepository } from './Repository/ModuleRepository';
import { NonDisponibiliteRepository } from './Repository/NonDisponibiliteRepository';
import { SalleRepository } from './Repository/SalleRepository';
import { SemestreRepository } from './Repository/SemestreRepository';
import { UserRepository } from './Repository/UserRepository';
import { ClasseService } from './services/classe-service-imp/classe-service-imp.service';
import { DepartementService } from './services/departement-service-imp/departement-service-imp.service';
import { ElementDeModuleService } from './services/element-de-module-service/element-de-module-service.service';
import { EmploiDeTempsServiceService } from './services/emploi-de-temps-service/emploi-de-temps-service.service';
import { ClasseControllerController } from './controllers/classe-controller/classe-controller.controller';
import { DepartementController } from './controllers/departement/departement.controller';
import { ElementdemoduleController } from './controllers/elementdemodule/elementdemodule.controller';
import { EnseignantService } from './services/enseignant/enseignant.service';
import { EnseignantRepository } from './Repository/EnseignantRepository';
import { EnseignantController } from './controllers/enseignant/enseignant.controller';
import { FiliereService } from './services/filiere/filiere.service';
import { FiliereController } from './controllers/filiere/filiere.controller';
import { ModuleService } from './services/module/module.service';
import { ModuleController } from './controllers/module/module.controller';
import { NonDisponibiliteService } from './services/non-disponibilite/non-disponibilite.service';
import { NonDisponibiliteController } from './controllers/non-disponibilite/non-disponibilite.controller';
import { SalleService } from './services/salle/salle.service';
import { SalleController } from './controllers/salle/salle.controller';
import { SemestreService } from './services/semestre/semestre.service';
import { SemestreController } from './controllers/semestre/semestre.controller';
import { AuthService } from './services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './services/auth/jwt.strategy';
import { AuthController } from './controllers/auth/auth.controller';
import { AdminService } from './services/dmin/dmin.service';
import { AdminController } from './controllers/admin/admin.controller';
import * as bcrypt from 'bcrypt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/rolesguard/rolesguard.guard';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Admin,Classe,Departement,ElementDeModule,
      Enseignant,Filiere,Modul,NonDisponibilite,Person,Salle,Semestre,
      /*,ElementDeModuleRepository,
      ,ModuleRepository,NonDisponibiliteRepository,
      SalleRepository,SemestreRepository,UserRepository*/
    ])
  ],
  controllers: [AppController, ClasseControllerController, DepartementController, ElementdemoduleController, EnseignantController, FiliereController, ModuleController, NonDisponibiliteController, SalleController, SemestreController, AuthController, AdminController],
  providers: [AppService, ClasseService, DepartementService, ElementDeModuleService, EmploiDeTempsServiceService,
    EnseignantService,ClasseRepository,FiliereRepository ,DepartementRepository,
    ElementDeModuleRepository, EnseignantService,
    UserRepository,EnseignantRepository, FiliereService, ModuleService,ModuleRepository,
    NonDisponibiliteService,NonDisponibiliteRepository, SalleService,SalleRepository,
    SemestreService,SemestreRepository, 
    AuthService,JwtStrategy, AdminService,UserRepository,
  
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },],
})


  export class AppModule implements OnModuleInit {
    constructor(private readonly adminService: AdminService,
                private readonly enseignantservice:EnseignantService
    ) {}
  
    async onModuleInit() {
      const defaultAdmin = {
        id:1,
        civilite:"",
        nom: 'wajih',
        Role: 'ADMIN',
        prenom: 'hammami',
        tel:"111",
        cne:"111" ,
        email: 'admin@example.com',
        login: 'admin',
       
        password: await bcrypt.hash('admin', 10), // Encrypt the password
       
        isAuthentificated: false,
        nonDisponibilites:[],
        elementDeModules:[],
      };

      const defaultprof={
        id:2,
        civilite:"",
        nom: "ossama",
        Role: "PROF",
        prenom: "ferjani",
        tel:"111",
        cne:"111" ,
        email: "prof@example.com",
        login: "prof",
       
        password: await bcrypt.hash('prof', 10), // Encrypt the password
       
        isAuthentificated: false,
        specialite:"reseau",
        nonDisponibilites:[],
        elementDeModules:[],

      }
  
      
        await this.adminService.addadmin(defaultAdmin);
        console.log('Default admin has been created.');
        await this.enseignantservice.addEnseignant(defaultprof)
        console.log('Default prof has been created.');
      
    }
  }

