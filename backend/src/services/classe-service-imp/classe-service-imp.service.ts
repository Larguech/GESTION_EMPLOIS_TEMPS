import { Injectable } from '@nestjs/common';
import { Classe } from 'src/enttities/Classe';
import { Filiere } from 'src/enttities/Filiere';
import { ClasseRepository } from 'src/Repository/ClasseRepository';
import { FiliereRepository } from 'src/Repository/FiliereRepository';
import { Page } from 'src/Page/Page';
import { Pageable } from 'src/Page/Pageable';
import { IClasseService } from '../IClasseService';

@Injectable()
export class ClasseService implements IClasseService {
  constructor(
    private readonly classeRepository: ClasseRepository,
    private readonly filiereRepository: FiliereRepository,
  ) {}

  
  async getClasses(): Promise<Classe[]> {
    return await this.classeRepository.find();
  }

  
  async addClasse(classe: Classe, id: number): Promise<Classe> {
    const filiere = await this.filiereRepository.findById(id);
    if (!filiere) {
      throw new Error(`La filiere avec id=${id} n'existe pas!`);
    }
    classe.filiere = filiere;
    return await this.classeRepository.save(classe);
  }

  
  async deleteClasse(id: number): Promise<string> {
    try {
      await this.getClasseById(id);
      await this.classeRepository.deleteById(id);
      return 'La suppression de classe est bien effectuée';
    } catch (error) {
      return error.message;
    }
  }

  
  async getClasseById(id: number): Promise<Classe> {
    const classe = await this.classeRepository.findById(id);
    if (!classe) {
      throw new Error('La classe n\'existe pas!');
    }
    return classe;
  }

  
  async updateClasse(id: number, classe: Classe): Promise<Classe> {
    classe.id = id;
    console.log('........id filiere updateClasse .......');
    console.log(classe.filiere?.id);
    return await this.classeRepository.save(classe);
  }
  /** 
   * 
   * page and pageable problem
   * 
   * 
   * **/
  /* page and pageable problem
  async getClassesPageable(pageable: Pageable): Promise<Page<Classe>> {
    return await this.classeRepository.findAllPageable(pageable);
  }

  
  async searchClasses(keyword: string, pageable: Pageable): Promise<Page<Classe>> {
    return await this.classeRepository.searchClasses(keyword, pageable);
  }

 
  async searchClassesBySemester(keyword: string, sem: number, pageable: Pageable): Promise<Page<Classe>> {
    return await this.classeRepository.searchClassesBySemester(keyword, sem, pageable);
  }
    */
}
