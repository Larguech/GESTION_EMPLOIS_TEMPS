// src/repositories/non-disponibilite.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { NonDisponibilite } from 'src/enttities/NonDisponibilite';

@EntityRepository(NonDisponibilite)
export class NonDisponibiliteRepository extends Repository<NonDisponibilite> {
  // Add custom query methods here if needed
}
