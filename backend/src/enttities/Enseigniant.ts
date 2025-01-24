import { ChildEntity, Column, Entity, OneToMany } from "typeorm";
import { Person } from "./Person";
import { NonDisponibilite } from "./NonDisponibilite";
import { ElementDeModule } from "./ElementDeModule";

@Entity()
//@ChildEntity('ENSEIGNANT') // Specifies this class as a child entity with a discriminator value
export class Enseignant extends Person {
  @Column()
  specialite: string;

  @OneToMany(() => NonDisponibilite, (nonDisponibilite) => nonDisponibilite.enseignant)
  nonDisponibilites: NonDisponibilite[];

  @OneToMany(() => ElementDeModule, (elementDeModule) => elementDeModule.enseignant
  )
  elementDeModules: ElementDeModule[];
}