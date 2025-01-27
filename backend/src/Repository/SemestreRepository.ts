// src/repositories/semestre.repository.ts
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Semestre } from 'src/enttities/Semestre';
import { NumeroSemester } from 'src/enttities/enums/NumeroSemestre';

@EntityRepository(Semestre)
export class SemestreRepository extends Repository<Semestre> {

  constructor(private dataSource: DataSource) {
        super(Semestre, dataSource.createEntityManager());
    }

  async findSemestreByNum(numeroSemester: NumeroSemester): Promise<Semestre[]> {
    return this.createQueryBuilder('semestre')
      .where('semestre.num = :numeroSemester', { numeroSemester })
      .getMany();
  }
}
