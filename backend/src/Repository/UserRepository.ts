// src/repositories/user.repository.ts
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Admin } from 'src/enttities/Admin';
import { Person } from 'src/enttities/Person';
import { Pageable } from 'src/Page/Pageable';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Enseignant } from 'src/enttities/Enseigniant';

@EntityRepository(Admin)
export class UserRepository extends Repository<Admin> {
  constructor(private dataSource: DataSource) {
      super(Admin, dataSource.createEntityManager());
  }
  async findUsersByRole(role: string,
                        options: IPaginationOptions): Promise<Pagination<Admin>> {
    const queryBuilder = this.createQueryBuilder('admin');

    queryBuilder.where('admin.role = :role', { role });

    return paginate<Admin>(queryBuilder, options);
  }

  async searchWithPagination(
    keyword: string,
    options: IPaginationOptions
  ): Promise<Pagination<Admin>> {
    const queryBuilder=this.createQueryBuilder('admin')
    queryBuilder.where('(admin.nom LIKE :keyword OR admin.prenom LIKE :keyword) AND admin.role = :role', {
        keyword: `%${keyword}%`,
        role: 'PROF',
      })
      return paginate<Admin>(queryBuilder, options);
  }

  async findAllByRole(role: string): Promise<Admin[]> {
    return this.createQueryBuilder('admin')
      .where('admin.role = :role', { role })
      .getMany();
  }

  async findEnseignantByNom(nom: string): Promise<Admin[]> {
    return this.createQueryBuilder('admin')
      .where(
        'admin.role = :role AND (admin.nom LIKE :nom OR admin.prenom LIKE :nom)',
        { role: 'PROF', nom: `%${nom}%` },
      )
      .getMany();
  }

  async findByLoginAndPassword(login: string, password: string): Promise<Admin | undefined> {
    return this.createQueryBuilder('admin')
      .where('admin.login = :login AND admin.password = :password', {
        login,
        password,
      })
      .getOne();
  }
}
