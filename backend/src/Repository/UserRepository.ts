// src/repositories/user.repository.ts
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Person } from 'src/enttities/Person';
import { Pageable } from 'src/Page/Pageable';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Enseignant } from 'src/enttities/Enseigniant';

@EntityRepository(Person)
export class UserRepository extends Repository<Person> {
  constructor(private dataSource: DataSource) {
      super(Person, dataSource.createEntityManager());
  }
  async findUsersByRole(role: string,
                        options: IPaginationOptions): Promise<Pagination<Person>> {
    const queryBuilder = this.createQueryBuilder('person');

    queryBuilder.where('person.role = :role', { role });

    return paginate<Person>(queryBuilder, options);
  }

  async searchWithPagination(
    keyword: string,
    options: IPaginationOptions
  ): Promise<Pagination<Person>> {
    const queryBuilder=this.createQueryBuilder('person')
    queryBuilder.where('(person.nom LIKE :keyword OR person.prenom LIKE :keyword) AND person.role = :role', {
        keyword: `%${keyword}%`,
        role: 'PROF',
      })
      return paginate<Person>(queryBuilder, options);
  }

  async findAllByRole(role: string): Promise<Person[]> {
    return this.createQueryBuilder('person')
      .where('person.role = :role', { role })
      .getMany();
  }

  async findEnseignantByNom(nom: string): Promise<Person[]> {
    return this.createQueryBuilder('person')
      .where(
        'person.role = :role AND (person.nom LIKE :nom OR person.prenom LIKE :nom)',
        { role: 'PROF', nom: `%${nom}%` },
      )
      .getMany();
  }

  async findByLoginAndPassword(login: string, password: string): Promise<Person | undefined> {
    return this.createQueryBuilder('person')
      .where('person.login = :login AND person.password = :password', {
        login,
        password,
      })
      .getOne();
  }
}
