import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './services/auth/auth.module';
import { ImportDataModule } from './import/import-data.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filiere } from './entities/filiere.entity';
import { salle } from './entities/salle.entity';
import { SalleModule } from './services/salle/salle.module';
import { Departement } from './entities/departement.entity';
import { DepartementModule } from './services/departement/departement.module';
import { FiliereModule } from './services/filiere/filiere.module'; 
import { User } from './entities/user.entity';
// import { ElementDeModule } from './entities/element-de-module.entity';
// import { Module as ModuleEntity } from './entities/module.entity'; 
// import { Enseignant } from './entities/enseignant.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'emplois_temps_db',
      entities: [salle,Departement,Filiere,User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([salle,Departement,Filiere,User]),
    AuthModule, ImportDataModule,SalleModule,DepartementModule,FiliereModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

