// src/repositories/salle.repository.ts
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Salle } from 'src/enttities/Salle';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { TypeSalle } from 'src/enttities/enums/TypeSalle';

@EntityRepository(Salle)
export class SalleRepository extends Repository<Salle> {

  constructor(private dataSource: DataSource) {
      super(Salle, dataSource.createEntityManager());
  }

  async searchWithPagination(
    typeSalle: TypeSalle,
    options:IPaginationOptions
  ): Promise<Pagination<Salle>> {
    const querybuilder= this.createQueryBuilder('salle')
      querybuilder.where('salle.typeSalle = :typeSalle', { typeSalle })
      return paginate<Salle>(querybuilder,options)
      
  }
  
  async findallsalles(options:IPaginationOptions):Promise<Pagination<Salle>>{
      const queryBuilder=this.createQueryBuilder('salle');
      queryBuilder.select()
      .getMany()
  
      return paginate<Salle>(queryBuilder,options);
    }
}
