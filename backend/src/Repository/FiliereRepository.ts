// src/repositories/filiere.repository.ts
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Filiere } from 'src/enttities/Filiere';
import { Pageable } from 'src/Page/Pageable';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@EntityRepository(Filiere)
export class FiliereRepository extends Repository<Filiere> {
  constructor(private dataSource: DataSource) {
      super(Filiere, dataSource.createEntityManager());
  }
  async searchFilieres(
    keyword: string,
    options:IPaginationOptions,
  ): Promise<Pagination<Filiere>> {
    const queryBuilder = this.createQueryBuilder('filiere');

    queryBuilder.where('filiere.libelle LIKE :keyword', { keyword: `%${keyword}%` });

    return paginate<Filiere>(queryBuilder, options);
  }

  async findById(id: number): Promise<Filiere | undefined> {
      return this.findOneById(id); // Automatically handles eager relations
    }

  async findallfiliere(options:IPaginationOptions):Promise<Pagination<Filiere>>{
    const queryBuilder=this.createQueryBuilder('filiere');
    queryBuilder.select()
    .getMany()

    return paginate<Filiere>(queryBuilder,options);
  }
}
