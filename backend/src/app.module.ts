import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
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


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'glace 123',
      database: 'webproject',
      autoLoadEntities: true,
      synchronize: true, // Auto-create tables during development
      logging: true
    }),
    TypeOrmModule.forFeature([Admin,Classe,Departement,ElementDeModule,
      Enseignant,Filiere,Modul,NonDisponibilite,Person,Salle,Semestre,
      ClasseRepository,DepartementRepository,ElementDeModuleRepository,
      FiliereRepository,ModuleRepository,NonDisponibiliteRepository,
      SalleRepository,SemestreRepository,UserRepository
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
