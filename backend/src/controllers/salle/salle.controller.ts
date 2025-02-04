import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { TypeSalle } from 'src/enttities/enums/TypeSalle';
import { Salle } from 'src/enttities/Salle';
import { SalleService } from 'src/services/salle/salle.service';

@Controller('api/salles')
export class SalleController {
    constructor(private salleservice:SalleService){}

    /*@Get()
    public getAllSalles(
        @Query('page') page:number=1,
        @Query('limit') limit:number=10
    ):Promise<Pagination<Salle>>{
       const options={page,limit}
       return this.salleservice.getSalleswithPagination(options)
    }*/
   @Get()
   public getAllSalles():Promise<Salle[]>{
    return this.salleservice.getSalles()
   }

   @Get("count")
   public getsallescount():Promise<number>{
    return this.salleservice.getsallescount()
   }

    @Get(":id")
    public getSalleById(@Param('id') id):Promise<Salle>{
        return this.salleservice.getSalleById(id);
    }


    @Post()
    public createSalle(@Body() salle:Salle):Promise<Salle>{
        return this.salleservice.addSalle(salle)
    }

    @Put(":id")
    public updateSalle(@Param('id')id,@Body()updatedsalle:Partial<Salle>):Promise<Salle>{
        return this.salleservice.updateSalle(id,updatedsalle);
    }

    @Delete(':id')
    public deleteSalle(@Param('id') id:number):Promise<string>{
        return this.salleservice.deleteSalle(id)
    }

    @Get("search")
    public searchSalles(
        @Param('keyword') keyword:string,
        @Query('page') page:number=1,
        @Query('limite') limit:number=10
    ):Promise<Pagination<Salle>>{
        
        const options={page,limit}
        if (!keyword || keyword.trim() === '') {
          return this.salleservice.getSalleswithPagination(options);
        }
    
        const typeSalle: TypeSalle = TypeSalle[keyword as keyof typeof TypeSalle];
        return this.salleservice.searchSalles(typeSalle, options);
      }
    }

