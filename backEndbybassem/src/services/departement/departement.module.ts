import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartementController } from './departement.controller';
import { DepartementService } from './departement.service';
import { Departement } from '../../entities/departement.entity';
import { Filiere } from '../../entities/filiere.entity'; // Si nécessaire

@Module({
  imports: [TypeOrmModule.forFeature([Departement, Filiere])], // Importe les entités nécessaires
  controllers: [DepartementController],
  providers: [DepartementService],
  exports: [DepartementService], // Exporte le service si nécessaire
})
export class DepartementModule {}