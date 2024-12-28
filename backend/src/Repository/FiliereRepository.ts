// src/repositories/filiere.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Filiere } from 'src/enttities/Filiere';

@EntityRepository(Filiere)
export class FiliereRepository extends Repository<Filiere> {
  async searchFilieres(
    keyword: string,
    skip: number,
    take: number,
  ): Promise<[Filiere[], number]> {
    return this.createQueryBuilder('filiere')
      .where('filiere.libelle LIKE :keyword', { keyword: `%${keyword}%` })
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }
}
