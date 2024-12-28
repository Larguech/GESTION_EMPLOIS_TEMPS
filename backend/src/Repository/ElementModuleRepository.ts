// src/repositories/element-de-module.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { ElementDeModule } from 'src/enttities/ElementDeModule';
import { DayOfWeek } from 'src/enttities/enums/DayofWeek';
import { Periode } from 'src/enttities/enums/Periode';

@EntityRepository(ElementDeModule)
export class ElementDeModuleRepository extends Repository<ElementDeModule> {
  async getEmploisByClasse(classeId: number): Promise<ElementDeModule[]> {
    return this.createQueryBuilder('element')
      .innerJoinAndSelect('element.module', 'module')
      .innerJoinAndSelect('module.classe', 'classe')
      .where('classe.id = :classeId', { classeId })
      .getMany();
  }

  async findByDayOfWeekAndPeriode(
    dayOfWeek: DayOfWeek,
    periode: Periode,
  ): Promise<ElementDeModule | undefined> {
    return this.createQueryBuilder('element')
      .where('element.jour = :dayOfWeek', { dayOfWeek })
      .andWhere('element.periode = :periode', { periode })
      .getOne();
  }

  async findByDayOfWeekAndPeriodeAndClasse(
    dayOfWeek: DayOfWeek,
    periode: Periode,
    classeId: number,
  ): Promise<ElementDeModule[]> {
    return this.createQueryBuilder('element')
      .innerJoinAndSelect('element.module', 'module')
      .innerJoinAndSelect('module.classe', 'classe')
      .where('element.jour = :dayOfWeek', { dayOfWeek })
      .andWhere('element.periode = :periode', { periode })
      .andWhere('classe.id = :classeId', { classeId })
      .getMany();
  }

  async findByDayOfWeekAndPeriodeAndProf(
    dayOfWeek: DayOfWeek,
    periode: Periode,
    profId: number,
  ): Promise<ElementDeModule[]> {
    return this.createQueryBuilder('element')
      .innerJoinAndSelect('element.enseignant', 'enseignant')
      .where('element.jour = :dayOfWeek', { dayOfWeek })
      .andWhere('element.periode = :periode', { periode })
      .andWhere('enseignant.id = :profId', { profId })
      .getMany();
  }
}
