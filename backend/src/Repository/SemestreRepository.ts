// src/repositories/semestre.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Semestre } from 'src/enttities/Semestre';

@EntityRepository(Semestre)
export class SemestreRepository extends Repository<Semestre> {
  async findSemestreByNum(numeroSemester: string): Promise<Semestre[]> {
    return this.createQueryBuilder('semestre')
      .where('semestre.num = :numeroSemester', { numeroSemester })
      .getMany();
  }
}
