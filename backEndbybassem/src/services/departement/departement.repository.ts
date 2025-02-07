import { EntityRepository, Repository } from 'typeorm';
import { Departement } from '../../entities/departement.entity';
import { Filiere } from '../../entities/filiere.entity';

@EntityRepository(Departement)
export class DepartementRepository extends Repository<Departement> {
  async findDepartementByLibelle(libelle: string): Promise<Departement[]> {
    return this.find({ where: { libelle } });
  }

  async searchWithPagination(keyword: string, options: { page: number; limit: number }): Promise<[Departement[], number]> {
    return this.createQueryBuilder('departement')
      .where('departement.libelle LIKE :keyword', { keyword: `%${keyword}%` })
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .getManyAndCount();
  }

  async getFilieresByDepartmentId(id: number): Promise<Filiere[]> {
    const departement = await this.findOne({ where: { id }, relations: ['filieres'] });
    return departement ? departement.filieres : [];
  }
}