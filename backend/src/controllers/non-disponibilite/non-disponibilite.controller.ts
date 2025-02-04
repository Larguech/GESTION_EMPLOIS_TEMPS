import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NonDisponibilite } from 'src/enttities/NonDisponibilite';
import { NonDisponibiliteService } from 'src/services/non-disponibilite/non-disponibilite.service';

@Controller('api/nonDisponibilites')
export class NonDisponibiliteController {
    constructor(private nonDisponibiliteService:NonDisponibiliteService){}

    @Get()
    public getAllNonDisponibilites():Promise<NonDisponibilite[]>{
        return this.nonDisponibiliteService.getNonDisponibilites()
    }

    @Get(":id")
    public getNonDisponibiliteById(@Param('id') id:number):Promise<NonDisponibilite>{
        return this.nonDisponibiliteService.getNonDisponibiliteById(id)
    }

    @Post()
    public createNonDisponibilite(@Body() nonDisponibilite:NonDisponibilite):Promise<NonDisponibilite>{
        return this.nonDisponibiliteService.addNonDisponibilite(nonDisponibilite)
    }

    @Put(":id")
    public updateNonDisponibilite(id:number,@Body()updatedNonDisponibilite:Partial<NonDisponibilite>):Promise<NonDisponibilite>{
        return this.nonDisponibiliteService.updateNonDisponibilite(id,updatedNonDisponibilite)
    }

    @Delete(":id")
    public deleteNonDisponibilite(@Param("id") id:number):Promise<string>{
        return this.nonDisponibiliteService.deleteNonDisponibilite(id)
    }
}
