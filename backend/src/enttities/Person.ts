

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  civilite: string;

  @Column()
  nom: string;

  @Column({ name: 'ROLE', insert: false, update: false })
  Role: string;

  @Column()
  prenom: string;

  @Column()
  tel: string;

  @Column()
  cne: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAuthentificated: boolean;
}
