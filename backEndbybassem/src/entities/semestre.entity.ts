import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { NumeroSemester } from './enums/numero-semester.enum'; // Importe l'enum NumeroSemester
import { Classe } from './classe.entity'; // Supposons que Classe est déjà traduit

@Entity()
export class Semestre {
  @PrimaryGeneratedColumn()
  id: number=0;

  @Column({ type: 'date' })
  dateDebut!: Date;

  @Column({ type: 'date' })
  dateFin!: Date;

  @Column({
    type: 'enum',
    enum: NumeroSemester,
  })
  num!: NumeroSemester;

  @Column()
  anneeUniv!: string; // Exemple : "2024-2025"

  @OneToMany(() => Classe, (classe) => classe.semestre)
  classes!: Classe[];
}