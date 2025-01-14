// src/repositories/departement.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Departement } from 'src/enttities/Departement';
import { Filiere } from 'src/enttities/Filiere';
import { Pageable } from 'src/Page/Pageable';

@EntityRepository(Departement)
export class DepartementRepository extends Repository<Departement> {
  async findDepartementByLibelle(nom: string): Promise<Departement[]> {
    return this.find({ where: { libelle: nom } });
  }

  async searchWithPagination(
    keyword: string,
    pageable:Pageable
  ): Promise<[Departement[], number]> {
    return this.createQueryBuilder('departement')
      .where('departement.libelle LIKE :keyword', { keyword: `%${keyword}%` })
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
