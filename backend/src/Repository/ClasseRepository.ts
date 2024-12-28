import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, Like } from 'typeorm';
import { Classe } from 'src/enttities/Classe';

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
    skip: number,
    take: number,
  ): Promise<[Classe[], number]> {
    return this.createQueryBuilder('classe')
      .innerJoinAndSelect('classe.semestre', 'semestre')
      .innerJoinAndSelect('classe.filiere', 'filiere')
      .where('semestre.id = :sem AND (classe.libelle LIKE :keyword OR filiere.libelle LIKE :keyword)', {
        sem,
        keyword: `%${keyword}%`,
      })
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async searchClassesWithoutSemester(
    keyword: string,
    skip: number,
    take: number,
  ): Promise<[Classe[], number]> {
    return this.createQueryBuilder('classe')
      .innerJoinAndSelect('classe.filiere', 'filiere')
      .where('classe.libelle LIKE :keyword OR filiere.libelle LIKE :keyword', {
        keyword: `%${keyword}%`,
      })
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }
}
