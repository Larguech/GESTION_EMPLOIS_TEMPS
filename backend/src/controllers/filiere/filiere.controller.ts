import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Filiere } from 'src/enttities/Filiere';
import { Semestre } from 'src/enttities/Semestre';
import { FiliereService } from 'src/services/filiere/filiere.service';

@Controller('api/filieres')
export class FiliereController {
    constructor(private filiereservice:FiliereService){}

    @Get()
    public getAllFilieres(
        
    ):Promise<Filiere[]>{
       
       return this.filiereservice.getFiliere();
    }
    /*@Get()
    public getAllFilieres(
        @Query('page')page:number=1,
        @Query('limit')limit:number=10
    ){
       const options={page,limit}
       return this.filiereservice.getFilieres(options);
    }*/

    @Get("all")
    public getFiliere2():Promise<Filiere[]>{
        return this.filiereservice.getFiliere()
        console.log("oo")
    }

    @Get(":id")
    public getFiliere(@Param('id') id):Promise<Filiere>{
        return this.filiereservice.getFiliereById(id);
    }

    @Post()
    public createFiliere(@Body()filiere:Filiere):Promise<Filiere>{
        return this.filiereservice.addFiliere(filiere);
    }

    @Put(":id")
    public updateFiliere(@Param('id')identity,@Body() updatedfiliere:Partial<Filiere>){
        return this.filiereservice.updateFiliere(identity,updatedfiliere);
    }

    @Delete(":id")
    public deleteFiliere(@Param('id') id):Promise<string>{
        return this.filiereservice.deleteFiliere(id);
    }

    @Get("/search")
    public searchFilieres(
        @Query('keyword') keyword,
        @Query('page') page:number=1,
        @Query('limit') limit:number=10
    ):Promise<Pagination<Filiere>>{
      const options={page,limit}
      return this.filiereservice.searchFilieres(keyword,options);
    }

    @Get(':id/semesters')
    public getSemestersByFiliere(@Param('id')id):Promise<Semestre[]>{
        return this.filiereservice.getSemestersByFiliere(id);
    }
    
}
