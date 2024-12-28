import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Classe } from "./Classe";
import { Departement } from "./Departement";

@Entity()
export class Filiere {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  libelle: string;

  @Column()
  nombreSem: number;

  @Column({ nullable: true })
  chefFiliere: string; // Optional field for the head of the Filiere

  @OneToMany(() => Classe, (classe) => classe.filiere, {
    eager: false,
    cascade: true,
  })
  classes: Classe[];

  @ManyToOne(() => Departement, (departement) => departement.filieres, {
    eager: true,
  })
  departement: Departement;
}