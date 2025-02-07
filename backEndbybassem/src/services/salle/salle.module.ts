import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalleController } from './salle.controller';
import { SalleService } from './salle.service';
import { salle } from '../../entities/salle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([salle])],  
  controllers: [SalleController],  
  providers: [SalleService],  
})
export class SalleModule {}