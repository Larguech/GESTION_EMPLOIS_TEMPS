// src/repositories/module.repository.ts
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Modul } from 'src/enttities/Module';

@EntityRepository(Modul)
export class ModuleRepository extends Repository<Modul> {
  
  constructor(private dataSource: DataSource) {
      super(Modul, dataSource.createEntityManager());
  }
  
  // Add custom query methods here if needed
}
