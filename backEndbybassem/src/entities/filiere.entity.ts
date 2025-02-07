import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Classe } from './classe.entity';  
import { Departement } from './departement.entity';  

@Entity()
export class Filiere {
  @PrimaryGeneratedColumn()
  id: number=0;

  @Column()
  libelle!: string;

  @Column()
  nombreSem: number=0;

  @Column()
  chefFiliere!: string;

  // @OneToMany(() => Classe, (classe) => classe.filiere)
  // classes!: Classe[];

  @ManyToOne(() => Departement, (departement) => departement.filieres)
  departement!: Departement;
}