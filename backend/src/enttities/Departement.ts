import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Filiere } from "./Filiere";

@Entity()
export class Departement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  libelle: string;

  @Column()
  chefDepartement: string;

  @OneToMany(() => Filiere, (filiere) => filiere.departement, {
    eager: false,
    cascade: true,
  })
  filieres: Filiere[];
}