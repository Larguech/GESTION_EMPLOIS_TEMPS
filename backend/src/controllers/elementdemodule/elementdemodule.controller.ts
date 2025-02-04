import { Body, Controller, Delete, Get, Param, Post,Put } from '@nestjs/common';
import { ElementDeModule } from 'src/enttities/ElementDeModule';
import { ElementDeModuleService } from 'src/services/element-de-module-service/element-de-module-service.service';

@Controller('api/elementModules')
export class ElementdemoduleController {
    constructor(private elementdemoduleservice:ElementDeModuleService){
      
    }
    @Get()
    public getAllElements():Promise<ElementDeModule[]>{
        return this.elementdemoduleservice.getElementDeModule()
    }
    
    @Get(":id")
    public getElementById(@Param('id') id):Promise<ElementDeModule>{
        return this.elementdemoduleservice.getElementDeModuleById(id);
    }

    @Post()
    public createElement(@Body()element:ElementDeModule):Promise<ElementDeModule>{
        return this.elementdemoduleservice.addElementDeModule(element);
    }

    @Put(':id')
    public updateElement(@Param('id') id,@Body() updatedelement:ElementDeModule):Promise<ElementDeModule>{
        return this.elementdemoduleservice.updateElementDeModule(id,updatedelement);
    }
    
    @Delete(":id")
    public deleteElement(@Param('id') id):Promise<string>{
        return this.elementdemoduleservice.deleteElementDeModule(id);
    }

}
