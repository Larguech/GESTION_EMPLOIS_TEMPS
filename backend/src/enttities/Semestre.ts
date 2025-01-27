import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NumeroSemester } from "./enums/NumeroSemestre";
import { Classe } from "./Classe";

@Entity()
export class Semestre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  dateDebut: Date;

  @Column({ type: 'date' })
  dateFin: Date;

  @Column({
    type: 'enum',
    enum: NumeroSemester,
  })
  num: NumeroSemester;

  @Column()
  anneeUniv: string; // Example: '2022-2023'

  @OneToMany(() => Classe, (classe) => classe.semestre)
  classes: Classe[];
}