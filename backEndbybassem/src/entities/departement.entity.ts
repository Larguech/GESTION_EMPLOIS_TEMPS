import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Filiere } from './filiere.entity'; // Supposons que Filiere est déjà traduit

@Entity()
export class Departement {
  @PrimaryGeneratedColumn()
  id: number=0;

  @Column()
  libelle!: string;

  @Column()
  chefDepartement!: string;

  @OneToMany(() => Filiere, (filiere) => filiere.departement, { eager: true })
  filieres!: Filiere[];
}