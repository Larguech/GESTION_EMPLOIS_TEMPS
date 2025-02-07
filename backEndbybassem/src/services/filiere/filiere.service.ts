import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filiere } from '../../entities/filiere.entity';
import { Semestre } from '../../entities/semestre.entity';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class FiliereService {
  constructor(
    @InjectRepository(Filiere)
    private readonly filiereRepository: Repository<Filiere>,
  ) {}

  async getFilieres(): Promise<Filiere[]> {
    return this.filiereRepository.find();
  }

  async getFilieresPaginated(options: { page: number; limit: number }): Promise<Pagination<Filiere>> {
    return paginate<Filiere>(this.filiereRepository, options);
  }

  async addFiliere(filiere: Filiere): Promise<Filiere> {
    return this.filiereRepository.save(filiere);
  }

  async deleteFiliere(id: number): Promise<string> {
    await this.filiereRepository.delete(id);
    return `Filiere with ID ${id} deleted successfully`;
  }

  async getFiliereById(id: number): Promise<Filiere> {
    const filiere = await this.filiereRepository.findOne({ where: { id } });
    if (!filiere) {
      throw new NotFoundException(`Filiere with ID ${id} not found`);
    }
    return filiere;
  }

   async updateFiliere(id: number, updatedFiliere: Filiere): Promise<Filiere> {
      try {
        await this.filiereRepository.findOneOrFail({ where: { id } });
        await this.filiereRepository.update(id, updatedFiliere);
        return this.filiereRepository.findOneOrFail({ where: { id } });
      } catch (error) {
        throw new NotFoundException(`Filiere with ID ${id} not found`);
      }
    }
  async searchFilieres(keyword: string, options: { page: number; limit: number }): Promise<Pagination<Filiere>> {
    const queryBuilder = this.filiereRepository.createQueryBuilder('filiere');
    queryBuilder.where('filiere.libelle LIKE :keyword', { keyword: `%${keyword}%` });
    return paginate<Filiere>(queryBuilder, options);
  }

//   async getSemestersByFiliere(filiereId: number): Promise<Semestre[]> {
//     const filiere = await this.filiereRepository.findOne({ where: { id: filiereId }, relations: ['classes', 'classes.semestre'] });
//     if (!filiere) {
//       throw new NotFoundException(`Filiere with ID ${filiereId} not found`);
//     }
//     // const semestres = filiere.classes.map(classe => classe.semestre);
//     // return semestres;
//   }
}