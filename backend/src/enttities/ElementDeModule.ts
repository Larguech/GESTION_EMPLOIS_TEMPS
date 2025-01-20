import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DayOfWeek } from "./enums/DayofWeek";
import { Periode } from "./enums/Periode";
import { Enseignant } from "./Enseigniant";
import { Salle } from "./Salle";
import { Modul } from "./Module";

@Entity()
export class ElementDeModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  volumeHoraire: number;

  @Column()
  libelle: string;

  @Column({
    type: 'enum',
    enum: DayOfWeek,
    nullable: false,
  })
  jour: DayOfWeek;

  @Column({
    type: 'enum',
    enum: Periode,
    //nullable: false,
  })
  periode: Periode;

  @ManyToOne(() => Salle, (salle) => salle.elementDeModules, {
    eager: true,
  })
  salle: Salle;

  @ManyToOne(() => Modul, (module) => module.elementDeModules, {
    eager: true,
  })
  module: Modul;

  @ManyToOne(() => Enseignant, (enseignant) => enseignant.elementDeModules, {
    
  })
  enseignant: Enseignant;
}