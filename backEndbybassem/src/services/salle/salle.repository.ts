import { EntityRepository, Repository } from 'typeorm';
import { salle } from '../../entities/salle.entity';
import { TypeSalle } from '../../entities/enums/type-salle.enum';

@EntityRepository(salle)
export class SalleRepository extends Repository<salle> {
  async searchWithPagination(typeSalle: TypeSalle, options: { page: number; limit: number }): Promise<[salle[], number]> {
    return this.createQueryBuilder('salle')
      .where('salle.typeSalle = :typeSalle', { typeSalle })
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .getManyAndCount();
  }
}