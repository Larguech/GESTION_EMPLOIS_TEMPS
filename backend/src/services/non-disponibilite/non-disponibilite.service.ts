import { Injectable, NotFoundException } from '@nestjs/common';
import { NonDisponibilite } from 'src/enttities/NonDisponibilite';
import { NonDisponibiliteRepository } from 'src/Repository/NonDisponibiliteRepository';

@Injectable()
export class NonDisponibiliteService {
    constructor(private nonDisponibiliteRepository: NonDisponibiliteRepository){}

    async getNonDisponibilites():Promise<NonDisponibilite[]>{
        return this.nonDisponibiliteRepository.find()
    }

    async addNonDisponibilite(nonDisponibilite:NonDisponibilite):Promise<NonDisponibilite>{
        return this.nonDisponibiliteRepository.save(nonDisponibilite)
    }

    async deleteNonDisponibilite(id:number):Promise<string>{
        const result=await this.nonDisponibiliteRepository.delete(id)

        if(result.affected===0){
            
            throw new NotFoundException(`l'operation n'est pas effectuer`)
        }
        else{
             return `l'operation est bien effectuer`
        }
    }

    async getNonDisponibiliteById(id: number): Promise<NonDisponibilite> {
        const nonDisponibilite = await this.nonDisponibiliteRepository.findOne({ where: { id } });
        if (!nonDisponibilite) {
          throw new NotFoundException("Cette non Disponibilité n'existe pas.");
        }
        return nonDisponibilite;
      }

    async updateNonDisponibilite(id:number,updatedata:Partial<NonDisponibilite>):Promise<NonDisponibilite>{
        const nonDisponibilite= await this.nonDisponibiliteRepository.findOne({where : {id}})
        if(!nonDisponibilite){
            throw new NotFoundException(`l'operation n'est pas fait`)
        }
        
            Object.assign(nonDisponibilite, updatedata);
            console.log('Updated data:', updatedata);
            console.log('After assignment:', nonDisponibilite);
        
            const updatedNonDisponibilite = await this.nonDisponibiliteRepository.save(nonDisponibilite);
        
            console.log('After save:', updatedNonDisponibilite);
        
            return updatedNonDisponibilite;
    }
}
