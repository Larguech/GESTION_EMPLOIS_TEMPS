import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiliereController } from './filiere.controller';
import { FiliereService } from './filiere.service';
import { Filiere } from '../../entities/filiere.entity';
import { Departement } from '../../entities/departement.entity'; // Si nécessaire

@Module({
  imports: [TypeOrmModule.forFeature([Filiere, Departement])], // Importe les entités nécessaires
  controllers: [FiliereController],
  providers: [FiliereService],
  exports: [FiliereService], // Exporte le service si nécessaire
})
export class FiliereModule {}