import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ name: 'is_admin' })
  admin: boolean;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ name: 'is_enseignant' })
  enseignant: boolean;
}