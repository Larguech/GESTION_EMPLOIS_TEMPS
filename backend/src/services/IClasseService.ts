import { Page } from 'src/Page/Page';
import { Pageable } from 'src/Page/Pageable';
import { Classe } from 'src/enttities/Classe';

export interface IClasseService {
  
  getClasses(): Promise<Classe[]>;

  
  addClasse(classe: Classe, idField: number): Promise<Classe>;

 
  deleteClasse(id: number): Promise<string>;

  
  getClasseById(id: number): Promise<Classe>;

  
  updateClasse(id: number, classe: Classe): Promise<Classe>;

  /* page and pageable problem
  getClassesPageable(pageable: Pageable): Promise<Page<Classe>>;

  
  searchClasses(keyword: string, pageable: Pageable): Promise<Page<Classe>>;

  
  searchClassesBySemester(keyword: string, sem: number, pageable: Pageable): Promise<Page<Classe>>;
  */
}

