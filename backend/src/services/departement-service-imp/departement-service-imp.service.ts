import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departement } from 'src/enttities/Departement';
import { Filiere } from 'src/enttities/Filiere';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { DepartementRepository } from 'src/Repository/DepartementRepository';
import { FiliereRepository } from 'src/Repository/FiliereRepository';

@Injectable()
export class DepartementService {
  
  constructor(
  
    private departementRepository: DepartementRepository,
    
    private filiereRepository: FiliereRepository,
  ) {}

  getDepartementCount(): Promise<number> {
    return this.departementRepository.count();
}
  // Get all departements
  async getDepartements(): Promise<Departement[]> {
    return this.departementRepository.find();
  }

  // Add a new departement
  async addDepartement(departement: Departement): Promise<Departement> {
    return this.departementRepository.save(departement);
  }

  // Find departement by name
  async findDepartementByNom(nom: string): Promise<Departement[]> {
    return this.departementRepository.find({ where: { libelle: nom } });
  }

  // Delete a departement by ID
  async deleteDepartement(id: number): Promise<string> {
    const result = await this.departementRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Departement with ID ${id} not found.`);
    }
    return `Departement with ID ${id} deleted successfully.`;
  }

  // Get a departement by ID
  async getDepartementById(id: number): Promise<Departement> {
    const departement = await this.departementRepository.findOneById(id);
    if (!departement) {
      throw new NotFoundException(`Departement with ID ${id} not found.`);
    }
    return departement;
  }

  // Update a departement by ID
  async updateDepartement(
    id: number,
    updatedDepartement: Partial<Departement>,
  ): Promise<Departement> {
    const departement = await this.getDepartementById(id);
    const updated = Object.assign(departement, updatedDepartement);
    return this.departementRepository.save(updated);
  }

  // Get filieres by department ID
  async getFilieresByDepartmentId(id: number): Promise<Filiere[]> {
    const departement = await this.getDepartementById(id);
    return this.filiereRepository.find({ where: { departement } });
  }

  async searchDepartement(keyword:string,options:IPaginationOptions):Promise<Pagination<Departement>>{
     return this.departementRepository.searchWithPagination(keyword,options);
  }
}
