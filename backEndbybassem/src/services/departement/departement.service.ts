import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departement } from '../../entities/departement.entity';
import { Filiere } from '../../entities/filiere.entity';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class DepartementService {
  constructor(
    @InjectRepository(Departement)
    private readonly departementRepository: Repository<Departement>,
  ) {}

  async getDepartements(): Promise<Departement[]> {
    return this.departementRepository.find();
  }

  async addDepartement(departement: Departement): Promise<Departement> {
    return this.departementRepository.save(departement);
  }

  async findDepartementByNom(nom: string): Promise<Departement[]> {
    return this.departementRepository.find({ where: { libelle: nom } });
  }

  async deleteDepartement(id: number): Promise<string> {
    await this.departementRepository.delete(id);
    return `Departement with ID ${id} deleted successfully`;
  }

  async getDepartementById(id: number): Promise<Departement> {
    const departement = await this.departementRepository.findOne({ where: { id } });
    if (!departement) {
      throw new NotFoundException(`Departement with ID ${id} not found`);
    }
    return departement;
  }

  
   async updateDepartement(id: number, updatedDepartement: Departement): Promise<Departement> {
      try {
        await this.departementRepository.findOneOrFail({ where: { id } });
        await this.departementRepository.update(id, updatedDepartement);
        return this.departementRepository.findOneOrFail({ where: { id } });
      } catch (error) {
        throw new NotFoundException(`departement with ID ${id} not found`);
      }
    }
  async searchDepartements(keyword: string, options: { page: number; limit: number }): Promise<Pagination<Departement>> {
    const queryBuilder = this.departementRepository.createQueryBuilder('departement');
    queryBuilder.where('departement.libelle LIKE :keyword', { keyword: `%${keyword}%` });
    return paginate<Departement>(queryBuilder, options);
  }

  async getFilieresByDepartmentId(id: number): Promise<Filiere[]> {
    const departement = await this.departementRepository.findOne({ where: { id }, relations: ['filieres'] });
    if (!departement) {
      throw new NotFoundException(`Departement with ID ${id} not found`);
    }
    return departement.filieres;
  }
}