import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { TypeSalle } from 'src/enttities/enums/TypeSalle';
import { Salle } from 'src/enttities/Salle';
import { SalleRepository } from 'src/Repository/SalleRepository';

@Injectable()
export class SalleService {
    constructor(private salleRepository:SalleRepository){}

    async getSalles():Promise<Salle[]>{
        return this.salleRepository.find()
    }

    async getsallescount():Promise<number>{
        return this.salleRepository.count()
    }

    async addSalle(salle:Salle):Promise<Salle>{
        return this.salleRepository.save(salle);
    }

    async deleteSalle(id:number):Promise<string>{
        const salle=await this.salleRepository.delete(id)
        if(salle.affected===0){
            throw new NotFoundException(`salle with ID ${id} not found`)
        }
        else{
            return `salle with ID ${id}has been successfully deleted.`
        }
    }

    async getSalleById(id:number):Promise<Salle>{
        try{
            return this.salleRepository.findOneById(id)
        }
        catch{
            throw new NotFoundException(`salle with ID ${id} not found`)
        }
    }

    async updateSalle(id:number,salledata:Partial<Salle>):Promise<Salle>{
        const salle= await this.salleRepository.findOne({where :{id}})
        if(!salle){
            throw new NotFoundException(`filiere with ID ${id} not found`)
        }
        
            Object.assign(salle,salledata)
            return this.salleRepository.save(salle);  
    }

    async searchSalles(keyword:TypeSalle,options:IPaginationOptions):Promise<Pagination<Salle>>{
        return this.salleRepository.searchWithPagination(keyword,options)
    }

    async getSalleswithPagination(options:IPaginationOptions):Promise<Pagination<Salle>>{
        return this.salleRepository.findallsalles(options)
        
    }
}
