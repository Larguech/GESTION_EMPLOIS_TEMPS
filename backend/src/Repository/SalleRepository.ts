// src/repositories/salle.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Salle } from 'src/enttities/Salle';

@EntityRepository(Salle)
export class SalleRepository extends Repository<Salle> {
  async searchWithPagination(
    typeSalle: string,
    skip: number,
    take: number,
  ): Promise<[Salle[], number]> {
    return this.createQueryBuilder('salle')
      .where('salle.typeSalle = :typeSalle', { typeSalle })
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }
}
