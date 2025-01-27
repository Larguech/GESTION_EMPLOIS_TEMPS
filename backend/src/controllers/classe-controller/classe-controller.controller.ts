import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Classe } from 'src/enttities/Classe';
import { Roles } from 'src/guard/roles-decorator';
import { ClasseService } from 'src/services/classe-service-imp/classe-service-imp.service';

@Controller('api/classes')
export class ClasseControllerController {
    constructor(private readonly classeservice:ClasseService){

    }
    @Roles('ADMIN','PROF','USER')
    @Get('allclasses')
    async getallClasses():Promise<Classe[]>{
        return this.classeservice.getClasses();
    }

    @Roles('ADMIN','PROF','USER')
    @Get(":id")
    async getClassesById(@Param('id') id): Promise<Classe>{
        return this.classeservice.getClasseById(id);
    }
    @Roles('ADMIN','PROF')
    @Post(':id')
    async createClasse(@Body()classe,@Param('id')id): Promise<Classe>{
        return this.classeservice.addClasse(classe,id);

    }
    @Roles('ADMIN','PROF')
    @Put(":id")
    async updateClasse(@Param('id')id,@Body() updatedclasse): Promise<Classe>{
        return this.classeservice.updateClasse(id,updatedclasse);
    }
    @Roles('ADMIN','PROF')
    @Delete(':id')
    async deleteClasse(@Param('id')id): Promise<string> {
        return this.classeservice.deleteClasse(id);
    }

    @Roles('ADMIN','PROF','USER')
    @Get('search-with-semester')
    async searchClassesWithSemester(
    @Query('keyword') keyword: string,
    @Query('semId') semId?: number,
    @Query('page') page = 1, // Default to page 1
    @Query('limit') limit = 10, // Default to 10 items per page
  ): Promise<Pagination<Classe>> {
    limit = limit > 100 ? 100 : limit; // Limit the maximum size per page
    const options = { page, limit };
    return this.classeservice.searchClassesWithSemister(keyword, semId, options);
  }

  @Roles('ADMIN','PROF','USER')
  @Get('search')
  async searchClasses(
    @Query('keyword') keyword: string,
    @Query('page') page = 1, // Default to page 1
    @Query('limit') limit = 10, // Default to 10 items per page
  ): Promise<Pagination<Classe>> {
    limit = limit > 100 ? 100 : limit; // Limit the maximum size per page
    const options = { page, limit };
    return this.classeservice.searchClasses(keyword, options);
  }
}
