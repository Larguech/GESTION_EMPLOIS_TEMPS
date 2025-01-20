import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElementDeModule } from 'src/enttities/ElementDeModule';
import { Classe } from 'src/enttities/Classe';
import { ClasseRepository } from 'src/Repository/ClasseRepository';
import { ElementDeModuleRepository } from 'src/Repository/ElementModuleRepository';

@Injectable()
export class ElementDeModuleService {
  constructor(
    
    private readonly elementDeModuleRepository: ElementDeModuleRepository
    
    
  ) {}

  // Get all ElementDeModule
  async getElementDeModule(): Promise<ElementDeModule[]> {
    return this.elementDeModuleRepository.find();
  }

  // Add a new ElementDeModule
  async addElementDeModule(elementDeModule: ElementDeModule): Promise<ElementDeModule> {
    return this.elementDeModuleRepository.save(elementDeModule);
  }

  // Delete an ElementDeModule by ID
  async deleteElementDeModule(id: number): Promise<string> {
    const result = await this.elementDeModuleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ElementDeModule with ID ${id} not found.`);
    }
    return `ElementDeModule with ID ${id} deleted successfully.`;
  }

  // Get an ElementDeModule by ID
  async getElementDeModuleById(id: number): Promise<ElementDeModule> {
    const elementDeModule = await this.elementDeModuleRepository.findOneById(id);
    if (!elementDeModule) {
      throw new NotFoundException(`ElementDeModule with ID ${id} not found.`);
    }
    return elementDeModule;
  }

  // Update an ElementDeModule by ID
  async updateElementDeModule(
    id: number,
    updatedElementDeModule: Partial<ElementDeModule>,
  ): Promise<ElementDeModule> {
    const elementDeModule = await this.getElementDeModuleById(id);
    const updated = Object.assign(elementDeModule, updatedElementDeModule);
    return this.elementDeModuleRepository.save(updated);
  }

  // Get all ElementDeModule for a specific Classe by its ID
  /*async getEmploisByClasse(classeId: number): Promise<ElementDeModule[]> {
    const classe = await this.classeRepository.findOneById(classeId);
    if (!classe) {
      throw new NotFoundException(`Classe with ID ${classeId} not found.`);
    }

    // Flatten all ElementDeModule from modules of the class
    return classe.modules.flatMap((module) => module.elementDeModules);
  }*/
   
    async getEmploisByClasse(classeId: number): Promise<ElementDeModule[]>{
      return this.elementDeModuleRepository.getEmploisByClasse(classeId);
    }
}
