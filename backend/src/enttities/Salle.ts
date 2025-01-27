import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TypeSalle } from "./enums/TypeSalle";
import { ElementDeModule } from "./ElementDeModule";

@Entity()
export class Salle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numSalle: number;

  @Column()
  capacite: number;

  @Column({
    type: 'enum',
    enum: TypeSalle,
    nullable: false,
  })
  typeSalle: TypeSalle;

  @OneToMany(() => ElementDeModule, (elementDeModule) => elementDeModule.salle)
  elementDeModules: ElementDeModule[];
}