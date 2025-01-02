// src/repositories/user.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Person } from 'src/enttities/Person';
import { Pageable } from 'src/Page/Pageable';

@EntityRepository(Person)
export class UserRepository extends Repository<Person> {
  async findUsersByRole(
    role: string,
    pageable:Pageable
  ): Promise<[Person[], number]> {
    return this.createQueryBuilder('person')
      .where('person.role = :role', { role })
      .getManyAndCount();
  }

  async searchWithPagination(
    keyword: string,
    pageable:Pageable
  ): Promise<[Person[], number]> {
    return this.createQueryBuilder('person')
      .where('(person.nom LIKE :keyword OR person.prenom LIKE :keyword) AND person.role = :role', {
        keyword: `%${keyword}%`,
        role: 'PROF',
      })
      .getManyAndCount();
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
