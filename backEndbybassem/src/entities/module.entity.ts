import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ElementDeModule } from './element-de-module.entity'; // Supposons que ElementDeModule est déjà traduit
import { Classe } from './classe.entity'; // Supposons que Classe est déjà traduit

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  volumeHoraire!: number;

  @Column()
  libelle!: string;

  @Column()
  isSeperated!: boolean;

  @Column()
  isMetuale!: boolean;

  @OneToMany(() => ElementDeModule, (elementDeModule) => elementDeModule.module, {
    eager: true,
  })
  elementDeModules!: ElementDeModule[];

  @ManyToOne(() => Classe, (classe) => classe.modules)
  classe!: Classe;
}