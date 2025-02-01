import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ImportDataModule } from './import/import-data.module';
// import { DataEntity } from './import/entity/data.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Enseignant } from './import/entity/Enseignant.entity';
// import { Filiere } from './import/entity/Filiere.entity';
// import { Salle } from './import/entity/Salle.entity';
// import { ElementDeModule } from './import/entity/ElementDeModule.entity'; 

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql', 
    //   host: 'localhost',
    //   port: 3306, 
    //   username: 'root',
    //   password: '', 
    //   database: 'emplois_temps_db', 
    //   entities: [],
    //   // entities: [DataEntity,Enseignant, Filiere, Salle, ElementDeModule],
    //   synchronize: true, 
    // }),
    AuthModule, ImportDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


