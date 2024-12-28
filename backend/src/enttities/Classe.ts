import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Modul } from "./Module";
import { Semestre } from "./Semestre";
import { Filiere } from "./Filiere";

@Entity()
export class Classe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  libelle: string;

  @Column()
  nbrEleves: number;

  @ManyToOne(() => Filiere, (filiere) => filiere.classes, {
    eager: true,
    nullable: false,
  })
  filiere: Filiere;

  @OneToMany(() => Modul, (module) => module.classe, {
    
    cascade: true,
  })
  modules: Modul[];

  @ManyToOne(() => Semestre, (semestre) => semestre.classes, {
    eager: true,
    nullable: false,
  })
  semestre: Semestre;
}