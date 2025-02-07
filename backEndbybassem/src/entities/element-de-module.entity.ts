import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Periode } from './enums/periode.enum'; // Importe l'enum Periode
import { salle } from './salle.entity'; // Supposons que Salle est déjà traduit
import { Module } from './module.entity'; // Supposons que Module est déjà traduit
import { Enseignant } from './enseignant.entity'; // Supposons que Enseignant est déjà traduit
import { DayOfWeek } from './enums/day-of-week.enum'; // Importe l'enum DayOfWeek

@Entity()
export class ElementDeModule {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  volumeHoraire: number = 0;

  @Column()
  libelle: string = '';

  @Column({
    type: 'enum',
    enum: DayOfWeek, // Utilise l'enum DayOfWeek
  })
  jour!: DayOfWeek;

  @Column({
    type: 'enum',
    enum: Periode,
  })
  periode!: Periode;

//  @ManyToOne(() => salle, (salle) => salle.elementDeModules, { nullable: true, onDelete: 'CASCADE' })
//  salle!: salle;


  @ManyToOne(() => Module, (module) => module.elementDeModules, { nullable: true, onDelete: 'CASCADE' })
  module!: Module;

  @ManyToOne(() => Enseignant, (enseignant) => enseignant.elementDeModules, { nullable: true, onDelete: 'CASCADE' })
  enseignant!: Enseignant;
}