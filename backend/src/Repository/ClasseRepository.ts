import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Like, DataSource } from 'typeorm';
import { Classe } from 'src/enttities/Classe';
import { Pageable } from 'src/Page/Pageable';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';




@EntityRepository(Classe)
@Injectable()
export class ClasseRepository extends Repository<Classe> {

  constructor(private dataSource: DataSource) {
    super(Classe, dataSource.createEntityManager());
}
  async getClassesByDepartement(departementId: number): Promise<Classe[]> {
    return this.createQueryBuilder('classe')
      .innerJoinAndSelect('classe.filiere', 'filiere')
      .innerJoinAndSelect('filiere.departement', 'departement')
      .where('departement.id = :departementId', { departementId })
      .getMany();
  }

  async getClassesById(id: number): Promise<Classe | undefined> {
    return this.findOne({ where: { id } });
  }


  async searchClassesWithoutSemester(
    keyword: string,
    pageable: Pageable
  ): Promise<[Classe[], number]> {
    return this.createQueryBuilder('classe')
      .innerJoinAndSelect('classe.filiere', 'filiere')
      .where('classe.libelle LIKE :keyword OR filiere.libelle LIKE :keyword', {
        keyword: `%${keyword}%`,
      }).getManyAndCount();
  }


  // Method to find a class by ID
  async findById(id: number): Promise<Classe | undefined> {
    return this.findOneById(id); // Automatically handles eager relations
  }

  // Method to delete a class by ID
  async deleteById(id: number): Promise<void> {
    await this.delete(id); // Deletes the entity with the given ID
  }

  async searchClassesWithSemister(
    keyword: string,
    semId: number | null,
    options: IPaginationOptions,
  ): Promise<Pagination<Classe>> {
    const queryBuilder= this.createQueryBuilder('classe')
      .leftJoinAndSelect('classe.filiere', 'filiere')
      .leftJoinAndSelect('classe.semestre', 'semestre')
      .where('(classe.libelle LIKE :keyword OR filiere.libelle LIKE :keyword)', {
        keyword: `%${keyword}%`,
      })
      ;
      return paginate<Classe>(queryBuilder, options);
    }

    async searchClasses(
      keyword: string,
      options: IPaginationOptions,
    ): Promise<Pagination<Classe>> {
      const queryBuilder = this.createQueryBuilder('classe')
        .leftJoinAndSelect('classe.filiere', 'filiere')
        .where('(classe.libelle LIKE :keyword OR filiere.libelle LIKE :keyword)', {
          keyword: `%${keyword}%`,
        });
        return  paginate<Classe>(queryBuilder, options);
      }
}
