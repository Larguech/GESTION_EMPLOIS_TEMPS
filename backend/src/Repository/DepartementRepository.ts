// src/repositories/departement.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Departement } from 'src/enttities/Departement';
import { Filiere } from 'src/enttities/Filiere';

@EntityRepository(Departement)
export class DepartementRepository extends Repository<Departement> {
  async findDepartementByLibelle(nom: string): Promise<Departement[]> {
    return this.find({ where: { libelle: nom } });
  }

  async searchWithPagination(
    keyword: string,
    skip: number,
    take: number,
  ): Promise<[Departement[], number]> {
    return this.createQueryBuilder('departement')
      .where('departement.libelle LIKE :keyword', { keyword: `%${keyword}%` })
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async getFilieresByDepartmentId(id: number): Promise<Filiere[]> {
    const departement = await this.createQueryBuilder('departement')
      .leftJoinAndSelect('departement.filieres', 'filiere')
      .where('departement.id = :id', { id })
      .getOne();

    return departement ? departement.filieres : [];
  }
}
