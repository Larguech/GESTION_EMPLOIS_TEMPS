import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TypeSalle } from './enums/type-salle.enum';
import { ElementDeModule } from './element-de-module.entity';

@Entity()
export class salle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numSalle: number;

  @Column()
  capacite: number;

  @Column({
    type: 'enum',
    enum: TypeSalle,
  })
  typeSalle: TypeSalle;

  // @OneToMany(() => ElementDeModule, (elementDeModule) => elementDeModule.salle, {
  //   eager: true,
  // })
  // elementDeModules: ElementDeModule[];
}