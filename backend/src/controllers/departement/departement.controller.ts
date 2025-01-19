import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ExecSyncOptionsWithStringEncoding } from 'child_process';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Departement } from 'src/enttities/Departement';
import { Filiere } from 'src/enttities/Filiere';
import { DepartementService } from 'src/services/departement-service-imp/departement-service-imp.service';

@Controller('api/departements')
export class DepartementController {
    
    constructor(private departementservice:DepartementService){
        
    }

    @Get()
    public getAllDepartements():Promise<Departement[]>{
        return this.departementservice.getDepartements();
    }

    @Get("/serach")
    public searchDepartements(
        @Query('keyword') keyword:string,
        @Query('page') page:number=1,
        @Query('limit') limit:number=10
    ):Promise<Pagination<Departement>>{
        const options={page,limit}
        return this.departementservice.searchDepartement(keyword,options);
    }

    @Get(":id")
    public getDepartementById(@Param('id') id:number):Promise<Departement>{
        return this.departementservice.getDepartementById(id);
    }

    @Post()
    public createDepartement(@Body()departement:Departement):Promise<Departement>{
        return this.departementservice.addDepartement(departement);
    }

    @Put(":id")
    public updateDepartement(@Param('id')id,@Body()updatedDepartement:Departement):Promise<Departement>{
        return this.departementservice.updateDepartement(id,updatedDepartement);
    }
    
    @Delete(":id/filieres")
    public deleteDepartement(@Param('id') id:number):Promise<string>{
        return this.departementservice.deleteDepartement(id);
    }
    
    @Get(":id/filieres")
    public getFiliereByDepartementId(@Param("id") id:number):Promise<Filiere[]>{
        return this.departementservice.getFilieresByDepartmentId(id);
    }

    
}
