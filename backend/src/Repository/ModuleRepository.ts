// src/repositories/module.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Modul } from 'src/enttities/Module';

@EntityRepository(Modul)
export class ModuleRepository extends Repository<Modul> {
  // Add custom query methods here if needed
}
