// src/repositories/non-disponibilite.repository.ts
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { NonDisponibilite } from 'src/enttities/NonDisponibilite';

@EntityRepository(NonDisponibilite)
export class NonDisponibiliteRepository extends Repository<NonDisponibilite> {
  
  constructor(private dataSource: DataSource) {
      super(NonDisponibilite, dataSource.createEntityManager());
  }
  
  // Add custom query methods here if needed
}
