import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Modul } from 'src/enttities/Module';
import { ModuleService } from 'src/services/module/module.service';

@Controller('api/modules')
export class ModuleController {
    constructor(private moduleservice : ModuleService){}

    @Get()
    public getAllModules():Promise<Modul[]>{
        return this.moduleservice.getModules()
    }

    @Get(":id")
    public getModuleById(@Param('id') id):Promise<Modul>{
        return this.moduleservice.getModuleById(id)
    }

    @Post()
    public createModule(@Body() module:Modul):Promise<Modul>{
        return this.moduleservice.addModule(module)
    }

    @Put(":id")
    public updateModule(@Param("id") identity,@Body() updatedmodule:Partial<Modul>){
        return this.moduleservice.updateModule(identity,updatedmodule)
    }
    
    @Delete(":id")
    public deleteModule(@Param('id') id):Promise<string>{
        return this.moduleservice.deleteModule(id);
    }
}
