import { Injectable, NotFoundException } from '@nestjs/common';
import { Classe } from 'src/enttities/Classe';
import { Filiere } from 'src/enttities/Filiere';
import { ClasseRepository } from 'src/Repository/ClasseRepository';
import { FiliereRepository } from 'src/Repository/FiliereRepository';
import { Page } from 'src/Page/Page';
import { Pageable } from 'src/Page/Pageable';
import { IClasseService } from '../IClasseService';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ClasseService  {

  
  constructor(
    //@InjectRepository(ClasseRepository)
    private  classeRepository: ClasseRepository,
    //@InjectRepository(FiliereRepository)
    private  filiereRepository:FiliereRepository,
    
  ) {
    
  }

  getClassesCount(): Promise<number> {
    return this.classeRepository.count();
}
  
  async getClasses(): Promise<Classe[]> {
    return await this.classeRepository.find();
  }

  
  async addClasse(classe: Classe, id: number): Promise<Classe> {
    const filiere = await this.filiereRepository.findOneById(id);
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
      throw new NotFoundException('La classe n\'existe pas!');
    }
    return classe;
  }

  
  async updateClasse(id: number, classe: Classe){
    classe.id = id;
    console.log('........id filiere updateClasse .......');
    console.log(classe.filiere?.id);
    // return await this.classeRepository.save(classe);
    await this.getClasseById(id); // Vérifie si l'ID existe avant
    return await this.classeRepository.update(id, classe);
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

  async searchClassesWithSemister(keyword: string,
      semId: number | null,
      options: IPaginationOptions,): Promise<Pagination<Classe>>{
         return await this.classeRepository.searchClassesWithSemister(keyword,
          semId,
          options)
      }

  async searchClasses(keyword: string,
    options: IPaginationOptions,): Promise<Pagination<Classe>>{
      return await this.classeRepository.searchClasses(keyword,
        options)
    }

  /* getClasses(Pageable pageable)*/ 
}
