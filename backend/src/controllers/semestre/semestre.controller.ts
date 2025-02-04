import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { promises } from 'dns';
import { Semestre } from 'src/enttities/Semestre';
import { SemestreService } from 'src/services/semestre/semestre.service';

@Controller('api/semestres')
export class SemestreController {
    constructor(private semestreservice:SemestreService){}

    @Get()
    public getAllSemestres():Promise<Semestre[]>{
        return this.semestreservice.getSemestres()
    }

    @Get(":id")
    public getSemestreById(@Param('id') id:number):Promise<Semestre>{
        return this.semestreservice.getSemestreById(id)
    }

    @Post()
    public createSemestre(@Body() semestre:Semestre):Promise<Semestre>{
        return this.semestreservice.addSemestre(semestre)
    }

    @Put(":id")
    public updateSemestre(@Param('id') id:number, @Body()updatedsemestre:Partial<Semestre>):Promise<Semestre>{
        return this.semestreservice.updateSemestre(id,updatedsemestre)
    }

    @Delete(":id")
    public deleteSemestre(@Param('id') id:number):Promise<string>{
        return this.semestreservice.deleteSemestre(id);
    }
}
