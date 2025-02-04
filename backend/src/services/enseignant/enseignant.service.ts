import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Enseignant } from 'src/enttities/Enseigniant';
import { Person } from 'src/enttities/Person';
import { EnseignantRepository } from 'src/Repository/EnseignantRepository';
import { UserRepository } from 'src/Repository/UserRepository';

@Injectable()
export class EnseignantService {
    constructor(
        private userRepository:UserRepository,
        private enseignantRepository:EnseignantRepository
    ){}
    async addEnseignant(enseignant:Enseignant):Promise<Enseignant>{
        return this.enseignantRepository.save(enseignant);
    }

    async getenseignantcount():Promise<number>{
        return this.enseignantRepository.count()
    }
    
    async getEnseignantById(id:number):Promise<Enseignant>{
        try{
            return this.enseignantRepository.findOneById(id)
        }
        catch{
            throw new NotFoundException("L'enseignant avec l'id " + id + " n'existe pas!")
        }  
    }
    async getEnseignant(options:IPaginationOptions):Promise<Pagination<Enseignant>>{
        return this.enseignantRepository.findUsersByRole("PROF",options);
    }

    async searchEnseignants(keyword:string,options:IPaginationOptions):Promise<Pagination<Enseignant>>{
        return this.enseignantRepository.searchWithPagination(keyword,options);
    }

    async getAllEnseignants():Promise<Enseignant[]>{
        return this.enseignantRepository.findAllByRole("PROF");
    }

    async findEnseignantByNom(nom:string):Promise<Enseignant[]>{
        return this.enseignantRepository.findEnseignantByNom(nom);
    }

    /*async updateEnseignant(id:number,enseignant:Enseignant):Promise<Enseignant>{
        //enseignant.id=id
        return this.enseignantRepository.save(enseignant);
    }*/
        async updateEnseignant(id: number, enseignantData: Partial<Enseignant>): Promise<Enseignant> {
            const enseignant = await this.enseignantRepository.findOne({ where: { id } });
        
            if (!enseignant) {
              throw new NotFoundException(`Enseignant with ID ${id} not found`);
            }
        
            Object.assign(enseignant, enseignantData);
            return this.enseignantRepository.save(enseignant);
          }

    async deleteEnseignant(id: number): Promise<string> {
        const result = await this.enseignantRepository.delete(id);
    
        if (result.affected === 0) {
          throw new NotFoundException(`Enseignant with ID ${id} not found.`);
        }
    
        return `Enseignant with ID ${id} has been successfully deleted.`;
      }
}
