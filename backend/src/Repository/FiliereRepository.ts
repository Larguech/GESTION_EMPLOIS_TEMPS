// src/repositories/filiere.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Filiere } from 'src/enttities/Filiere';
import { Pageable } from 'src/Page/Pageable';

@EntityRepository(Filiere)
export class FiliereRepository extends Repository<Filiere> {
  async searchFilieres(
    keyword: string,
    pageable: Pageable
  ): Promise<[Filiere[], number]> {
    return this.createQueryBuilder('filiere')
      .where('filiere.libelle LIKE :keyword', { keyword: `%${keyword}%` })
      .getManyAndCount();
  }

  async findById(id: number): Promise<Filiere | undefined> {
      return this.findOneById(id); // Automatically handles eager relations
    }
}
