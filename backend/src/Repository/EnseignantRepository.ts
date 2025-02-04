import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { Enseignant } from "src/enttities/Enseigniant";
import { DataSource, EntityRepository, Repository } from "typeorm";

@EntityRepository(Enseignant)
export class EnseignantRepository extends Repository<Enseignant> {

    constructor(private dataSource: DataSource) {
        super(Enseignant, dataSource.createEntityManager());
    }
    async findEnseignantByNom(nom: string): Promise<Enseignant[]> {
        return this.createQueryBuilder('enseignant')
          .where(
            'enseignant.role = :role AND (enseignant.nom LIKE :nom OR enseignant.prenom LIKE :nom)',
            { role: 'PROF', nom: `%${nom}%` },
          )
          .getMany();
      }

      async searchWithPagination(
          keyword: string,
          options: IPaginationOptions
        ): Promise<Pagination<Enseignant>> {
          const queryBuilder=this.createQueryBuilder('enseignant')
          queryBuilder.where('(enseignant.nom LIKE :keyword OR enseignant.prenom LIKE :keyword) AND enseignant.role = :role', {
              keyword: `%${keyword}%`,
              role: 'PROF',
            })
            return paginate<Enseignant>(queryBuilder, options);
        }

        async findAllByRole(role: string): Promise<Enseignant[]> {
            return this.createQueryBuilder('enseignant')
              .where('enseignant.role = :role', { role })
              .getMany();
          }

        async findByLoginAndPassword(login: string, password: string): Promise<Enseignant | undefined> {
            return this.createQueryBuilder('enseignant')
              .where('enseignant.login = :login AND enseignant.password = :password', {
                login,
                password,
              })
              .getOne();
          }

        async findUsersByRole(role: string,
                                options: IPaginationOptions): Promise<Pagination<Enseignant>> {
            const queryBuilder = this.createQueryBuilder('enseignant');
        
            queryBuilder.where('enseignant.role = :role', { role });
        
            return paginate<Enseignant>(queryBuilder, options);
          }
        
}