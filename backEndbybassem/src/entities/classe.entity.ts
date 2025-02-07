import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Filiere } from './filiere.entity'; // Supposons que Filiere est déjà traduit
import { Module } from './module.entity'; // Supposons que Module est déjà traduit
import { Semestre } from './semestre.entity'; // Supposons que Semestre est déjà traduit

@Entity()
export class Classe {
  @PrimaryGeneratedColumn()
  id: number=0;

  @Column()
  libelle!: string;

  @Column()
  nbrEleves!: number;

  // @ManyToOne(() => Filiere, (filiere) => filiere.classes)
  // filiere!: Filiere;

  @OneToMany(() => Module, (module) => module.classe, { eager: true })
  modules!: Module[];

  @ManyToOne(() => Semestre, (semestre) => semestre.classes)
  semestre!: Semestre;
}