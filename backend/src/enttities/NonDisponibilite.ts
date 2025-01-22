import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DayOfWeek } from "./enums/DayofWeek";
import { Periode } from "./enums/Periode";
import { Enseignant } from "./Enseigniant";
import { Admin } from "./Admin";


@Entity()
export class NonDisponibilite {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      type: 'enum',
      enum: DayOfWeek,
      
    })
    jour: DayOfWeek; // Day of the week
  
    @Column({
        type: 'enum',
        enum: Periode,
        
      
    })
    periode: Periode;
  
    @ManyToOne(() => Enseignant, (enseignant) => enseignant.nonDisponibilites)
    enseignant: Enseignant;
    
    
  }