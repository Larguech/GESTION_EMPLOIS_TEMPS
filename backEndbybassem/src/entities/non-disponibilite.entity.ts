import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Periode } from './enums/periode.enum'; // Importe l'enum Periode
import { Enseignant } from './enseignant.entity'; // Supposons que Enseignant est déjà traduit
import { DayOfWeek } from './enums/day-of-week.enum'; 
@Entity()
export class NonDisponibilite {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: DayOfWeek, // Utilise DayOfWeek de TypeScript
  })
  jour!: DayOfWeek;

  @Column({
    type: 'enum',
    enum: Periode,
  })
  periode!: Periode;

  @ManyToOne(() => Enseignant, (enseignant) => enseignant.nonDisponibilites)
  enseignant!: Enseignant;
}