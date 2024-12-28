import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ElementDeModule } from "./ElementDeModule";
import { Classe } from "./Classe";

@Entity()
export class Modul {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  volumeHoraire: number;

  @Column()
  libelle: string;

  @Column({ default: false })
  isSeperated: boolean;

  @Column({ default: false })
  isMetuale: boolean;

  @OneToMany(() => ElementDeModule, (elementDeModule) => elementDeModule.module, {
    
    cascade: true,
  })
  elementDeModules: ElementDeModule[];

  @ManyToOne(() => Classe, (classe) => classe.modules, {
    eager: true,
  })
  classe: Classe;
}