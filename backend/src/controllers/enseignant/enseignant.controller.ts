import { Body, Controller, Delete, Get, Options, Param, Post, Put, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Enseignant } from 'src/enttities/Enseigniant';
import { EnseignantService } from 'src/services/enseignant/enseignant.service';

@Controller('api/enseignants')
export class EnseignantController {
    constructor(private enseignantservice:EnseignantService){

    }

    @Get()
    public getAllEnseignant(
       @Query('page') page:number=1,
       @Query('limit') limit:number=10
    ):Promise<Pagination<Enseignant>>{
        const options={page,limit}
        return this.enseignantservice.getEnseignant(options)
    }

    @Get(":id")
    public getEnseignantById(@Param('id') id):Promise<Enseignant>{
        return this.enseignantservice.getEnseignantById(id);
    }

    @Post()
    public createEnseignant(@Body() enseignant:Enseignant):Promise<Enseignant>{
        return this.enseignantservice.addEnseignant(enseignant);
    }

    @Put(":id")
    public updateEnseignant(@Param('id') id,@Body() updatedenseignant:Enseignant):Promise<Enseignant>{
        return this.enseignantservice.updateEnseignant(id,updatedenseignant);
    }

    @Delete(":id")
    public deleteEnseignant(@Param('id') id){
        return this.enseignantservice.deleteEnseignant(id);
    }

    @Get("search")
    public searchEnseignant(
        @Query('keyword') keyword,
        @Query('page') page:number=1,
        @Query('limit') limit:number=10
    ):Promise<Pagination<Enseignant>>{
        const options={page,limit}
        return this.enseignantservice.searchEnseignants(keyword,options);
    }
}
