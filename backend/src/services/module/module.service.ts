import { Injectable, NotFoundException } from '@nestjs/common';
import { Modul } from 'src/enttities/Module';
import { ModuleRepository } from 'src/Repository/ModuleRepository';

@Injectable()
export class ModuleService {
    constructor(private moduleRepository: ModuleRepository){}

    async getModules():Promise<Modul[]>{
        return this.moduleRepository.find();
    }

    async addModule(module:Modul):Promise<Modul>{
        return this.moduleRepository.save(module);
    }

    async deleteModule(id:number):Promise<string>{
        const result= await this.moduleRepository.delete(id);
        if(result.affected===0){
             throw new NotFoundException(`module with ID ${id} not found`)
        }
        else {
            return `module with ID ${id}has been successfully deleted.`
        }    
    }
     
    async getModuleById(id:number):Promise<Modul>{
        try{
            return this.moduleRepository.findOneBy({id})
        }
        catch{
            throw new NotFoundException(`the module with ID ${id} doesn't exists`)
        }
    }
    
    async updateModule(id:number,moduleData:Partial<Modul>):Promise<Modul>{
        const module= await this.moduleRepository.findOne({where : {id}})
        if(!module){
            throw new NotFoundException(`module with ID ${id} not found`)
        }
        Object.assign(module,moduleData)
        return this.moduleRepository.save(module);
    }
    

}
