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
  import { FiliereService } from './filiere.service';
  import { Filiere } from '../../entities/filiere.entity';
  import { Pagination } from 'nestjs-typeorm-paginate';
  import { Semestre } from '../../entities/semestre.entity';
  
  @Controller('filieres')
  export class FiliereController {
    constructor(private readonly filiereService: FiliereService) {}
  
    @Get()
    async getAllFilieres(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
      @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number = 10,
    ): Promise<Pagination<Filiere>> {
      return this.filiereService.getFilieresPaginated({ page, limit: size });
    }
  
    @Get(':id')
    async getFiliereById(@Param('id') id: number): Promise<Filiere> {
      return this.filiereService.getFiliereById(id);
    }
  
    @Post()
    async createFiliere(@Body() filiere: Filiere): Promise<Filiere> {
      return this.filiereService.addFiliere(filiere);
    }
  
    @Put(':id')
    async updateFiliere(@Param('id') id: number, @Body() updatedFiliere: Filiere): Promise<Filiere> {
      return this.filiereService.updateFiliere(id, updatedFiliere);
    }
  
    @Delete(':id')
    async deleteFiliere(@Param('id') id: number): Promise<string> {
      return this.filiereService.deleteFiliere(id);
    }
  
    @Get('search')
    async searchFilieres(
      @Query('keyword') keyword: string,
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
      @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number = 10,
    ): Promise<Pagination<Filiere>> {
      return this.filiereService.searchFilieres(keyword, { page, limit: size });
    }
  
    // @Get(':id/semesters')
    // async getSemestersByFiliere(@Param('id') id: number): Promise<Semestre[]> {
    //   return this.filiereService.getSemestersByFiliere(id);
    // }
  }