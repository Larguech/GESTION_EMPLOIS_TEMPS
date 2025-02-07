import { Entity, Column, OneToMany, ChildEntity  } from 'typeorm';
import { Person } from './person.entity'; // Supposons que Person est déjà traduit
import { TypeAdmin } from './enums/type-admin.enum'; // Importe l'enum TypeAdmin
import { NonDisponibilite } from './non-disponibilite.entity'; // Supposons que cette entité existe
import { ElementDeModule } from './element-de-module.entity'; // Supposons que cette entité existe

@Entity()
@ChildEntity ('ADMIN') // Utilisé pour l'héritage (si applicable)
export class Admin extends Person {
  @Column({
    type: 'enum',
    enum: TypeAdmin,
  })
  admin_type!: TypeAdmin;

  @OneToMany(() => NonDisponibilite, (nonDisponibilite) => nonDisponibilite.enseignant, {
    eager: true,
  })
  nonDisponibilites!: NonDisponibilite[];

  @OneToMany(() => ElementDeModule, (elementDeModule) => elementDeModule.enseignant, {
    eager: true,
  })
  elementDeModules!: ElementDeModule[];
}