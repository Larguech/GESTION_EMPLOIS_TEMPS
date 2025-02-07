import { Entity, Column, OneToMany, ChildEntity} from 'typeorm';
import { Person } from './person.entity'; // Supposons que Person est déjà traduit
import { NonDisponibilite } from './non-disponibilite.entity'; // Supposons que NonDisponibilite est déjà traduit
import { ElementDeModule } from './element-de-module.entity'; // Supposons que ElementDeModule est déjà traduit

@Entity()
@ChildEntity ('PROF') // Utilisé pour l'héritage (si applicable)
export class Enseignant extends Person {
  @Column()
  specialite!: string;

  @OneToMany(() => NonDisponibilite, (nonDisponibilite) => nonDisponibilite.enseignant, {
    eager: true,
  })
  nonDisponibilites!: NonDisponibilite[];

  @OneToMany(() => ElementDeModule, (elementDeModule) => elementDeModule.enseignant, {
    eager: true,
  })
  elementDeModules!: ElementDeModule[];
}