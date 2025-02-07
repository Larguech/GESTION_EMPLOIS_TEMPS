import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Query,
    Param,
    Body,
    DefaultValuePipe,
    ParseIntPipe,
  } from '@nestjs/common';
  import { DepartementService } from './departement.service';
  import { Departement } from '../../entities/departement.entity';
  import { Pagination } from 'nestjs-typeorm-paginate';
  import { Filiere } from '../../entities/filiere.entity';
  
  @Controller('api/departements')
  export class DepartementController {
    constructor(private readonly departementService: DepartementService) {}
  
    @Get()
    async getAllDepartements(): Promise<Departement[]> {
      return this.departementService.getDepartements();
    }
  
    @Get('search')
    async searchDepartements(
      @Query('keyword') keyword: string,
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
      @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number = 10,
    ): Promise<Pagination<Departement>> {
      return this.departementService.searchDepartements(keyword, { page, limit: size });
    }
  
    @Get(':id')
    async getDepartementById(@Param('id') id: number): Promise<Departement> {
      return this.departementService.getDepartementById(id);
    }
  
    @Post()
    async createDepartement(@Body() departement: Departement): Promise<Departement> {
      return this.departementService.addDepartement(departement);
    }
  
    @Put(':id')
    async updateDepartement(@Param('id') id: number, @Body() updatedDepartement: Departement): Promise<Departement> {
      return this.departementService.updateDepartement(id, updatedDepartement);
    }
  
    @Delete(':id')
    async deleteDepartement(@Param('id') id: number): Promise<string> {
      return this.departementService.deleteDepartement(id);
    }
  
    @Get(':id/filieres')
    async getFilieresByDepartmentId(@Param('id') id: number): Promise<Filiere[]> {
      return this.departementService.getFilieresByDepartmentId(id);
    }
  }