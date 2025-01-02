import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Like } from 'typeorm';
import { Classe } from 'src/enttities/Classe';
import { Pageable } from 'src/Page/Pageable';

@Injectable()
@EntityRepository(Classe)
export class ClasseRepository extends Repository<Classe> {
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

  async searchClasses(
    keyword: string,
    sem: number,
    pageable:Pageable
  ): Promise<[Classe[], number]> {
    return this.createQueryBuilder('classe')
      .innerJoinAndSelect('classe.semestre', 'semestre')
      .innerJoinAndSelect('classe.filiere', 'filiere')
      .where('semestre.id = :sem AND (classe.libelle LIKE :keyword OR filiere.libelle LIKE :keyword)', {
        sem,
        keyword: `%${keyword}%`,
      })
      .getManyAndCount();
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
}
