import { Injectable, NotFoundException } from '@nestjs/common';
import { retry } from 'rxjs';
import { NumeroSemester } from 'src/enttities/enums/NumeroSemestre';
import { Semestre } from 'src/enttities/Semestre';
import { SemestreRepository } from 'src/Repository/SemestreRepository';

@Injectable()
export class SemestreService {
    constructor(private semestreRepository:SemestreRepository){}

    async getSemestres():Promise<Semestre[]>{
        return this.semestreRepository.find();
    }

    async addSemestre(semestre:Semestre):Promise<Semestre>{
        return this.semestreRepository.save(semestre)
    }

    async deleteSemestre(id:number):Promise<string>{
        const result= await this.semestreRepository.delete(id)
        
                if(result.affected ===0){
                    throw new NotFoundException(`semestre with ID ${id} not found`)
                }
                else {
                    return `semstre with ID ${id}has been successfully deleted.`
                }  
    }

    async getSemestreById(id:number):Promise<Semestre>{
        try{
        return this.semestreRepository.findOneById(id)
           }
        catch{
            throw new NotFoundException(`semestre with ID ${id} not found`)
        }
    }

    async updateSemestre(id:number,semestredata:Partial<Semestre>):Promise<Semestre>{
        const semestre= await this.semestreRepository.findOne({where :{id}})
        if(!semestre){
            throw new NotFoundException(`filiere with ID ${id} not found`)
        }
        
            Object.assign(semestre,semestredata)
            return this.semestreRepository.save(semestre); 
    }

    async findSemestreByNum(numeroSemester:NumeroSemester):Promise<Semestre[]>{
        return this.semestreRepository.findSemestreByNum(numeroSemester)
    }
}
