// src/repositories/salle.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Salle } from 'src/enttities/Salle';
import { Pageable } from 'src/Page/Pageable';

@EntityRepository(Salle)
export class SalleRepository extends Repository<Salle> {
  async searchWithPagination(
    typeSalle: string,
    pageable:Pageable
  ): Promise<[Salle[], number]> {
    return this.createQueryBuilder('salle')
      .where('salle.typeSalle = :typeSalle', { typeSalle })
      .getManyAndCount();
  }
}
