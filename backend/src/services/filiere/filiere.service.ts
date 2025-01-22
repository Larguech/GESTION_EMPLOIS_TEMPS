import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Filiere } from 'src/enttities/Filiere';
import { Semestre } from 'src/enttities/Semestre';
import { FiliereRepository } from 'src/Repository/FiliereRepository';

@Injectable()
export class FiliereService {
    constructor(
        private filiereRepository:FiliereRepository
    ){}

    async getFiliere():Promise<Filiere[]>{
        return this.filiereRepository.find();
    }

    async addFiliere(filiere:Filiere):Promise<Filiere>{
        return this.filiereRepository.save(filiere);
    }

    async deleteFiliere(id:number):Promise<string>{
        const result= await this.filiereRepository.delete(id)

        if(result.affected ===0){
            throw new NotFoundException(`filiere with ID ${id} not found`)
        }
        else {
            return `filiere with ID ${id}has been successfully deleted.`
        }   
    }

    async getFiliereById(id:number):Promise<Filiere>{
        try{
            return this.filiereRepository.findById(id)
        }
        catch{
            throw new NotFoundException(`filiere with ID ${id} not found`)
        }
    }

    async updateFiliere(id:number,filiereData:Partial<Filiere>):Promise<Filiere>{
        const filiere= await this.filiereRepository.findOne({where :{id}})
        if(!filiere){
            throw new NotFoundException(`filiere with ID ${id} not found`)
        }
        
            Object.assign(filiere,filiereData)
            return this.filiereRepository.save(filiere);  
    }

    async getFilieres(options:IPaginationOptions):Promise<Pagination<Filiere>>{
        return this.filiereRepository.findallfiliere(options);
    }

    async searchFilieres(keyword:string,options:IPaginationOptions):Promise<Pagination<Filiere>>{
        return this.filiereRepository.searchFilieres(keyword,options)
    }

    async getSemestersByFiliere(filiereId: number): Promise<Semestre[]> {
        // Fetch the Filiere by its ID
        const filiere = await this.filiereRepository.findOne({
          where: { id: filiereId },
          relations: ['classes', 'classes.semestre'], // Ensure related data is loaded
        });
    
        if (!filiere) {
          throw new NotFoundException(`Filiere with ID ${filiereId} not found`);
        }
    
        // Extract the semesters from the classes
        const semestres: Semestre[] = filiere.classes.map((classe) => classe.semestre);
    
        return semestres;
      }





}
