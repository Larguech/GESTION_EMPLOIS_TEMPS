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
  NotFoundException,
} from '@nestjs/common';

import { salle } from '../../entities/salle.entity'; 
import { TypeSalle } from '../../entities/enums/type-salle.enum'; 
import { Pagination } from 'nestjs-typeorm-paginate'; 
import { SalleService } from './salle.service';

@Controller('salles') 
export class SalleController {
  constructor(private readonly salleService: SalleService) {}

  @Get()
  async getAllSalles(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number = 10,
  ): Promise<Pagination<salle>> {
    return this.salleService.getSalles({ page, limit: size });
  }

  @Get(':id')
  async getSalleById(@Param('id') id: number): Promise<salle> {
    return this.salleService.getSalleById(id);
  }

  @Post()
  async createSalle(@Body() salle: salle): Promise<salle> {
    return this.salleService.addSalle(salle);
  }

  @Put(':id')
  async updateSalle(
    @Param('id') id: number,
    @Body() updatedSalle: salle,
  ): Promise<salle> {
    return this.salleService.updateSalle(id, updatedSalle);
  }

  @Delete(':id')
  async deleteSalle(@Param('id') id: number): Promise<string> {
    console.log('deleteSalle', id);
    return this.salleService.deleteSalle(id);
  }

  @Get('search')
async searchSalles(
  @Query('keyword') keyword: string,
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number = 10,
): Promise<Pagination<salle>> {
  console.log('*' + keyword + '*');
  
  if (!keyword) {
    return this.getAllSalles(page, size);
  }

  const typeSalle = TypeSalle[keyword as keyof typeof TypeSalle];
  
  if (typeSalle === undefined) {
    throw new NotFoundException(`Salle type "${keyword}" not found`);
  }
  
  return this.salleService.searchSalles(typeSalle, { page, limit: size });
}



  
}