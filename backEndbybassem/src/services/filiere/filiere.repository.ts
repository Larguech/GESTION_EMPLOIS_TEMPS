
import { EntityRepository, Repository } from 'typeorm';
import { Filiere } from '../../entities/filiere.entity';

@EntityRepository(Filiere)
export class FiliereRepository extends Repository<Filiere> {
  async searchFilieres(keyword: string, options: { page: number; limit: number }): Promise<[Filiere[], number]> {
    return this.createQueryBuilder('filiere')
      .where('filiere.libelle LIKE :keyword', { keyword: `%${keyword}%` })
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .getManyAndCount();
  }
}