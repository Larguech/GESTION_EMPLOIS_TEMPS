import { Module } from '@nestjs/common';
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


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
  controllers: [AppController, ClasseControllerController, DepartementController],
  providers: [AppService, ClasseService, DepartementService, ElementDeModuleService, EmploiDeTempsServiceService,
    ClasseRepository,FiliereRepository ,DepartementRepository],
})
export class AppModule {}
