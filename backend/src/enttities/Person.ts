

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true,default:"" })
  civilite: string;

  @Column({default:""})
  nom: string;

  @Column({default:""})
  Role: string;

  @Column({default:""})
  prenom: string;

  @Column({default:""})
  tel: string;

  @Column({default:""})
  cne: string;

  @Column({ unique: true,default:"" })
  email: string;

  @Column({ unique: true,default:"" })
  login: string;

  @Column({default:""})
  password: string;

  @Column({ default: false })
  isAuthentificated: boolean;
}
