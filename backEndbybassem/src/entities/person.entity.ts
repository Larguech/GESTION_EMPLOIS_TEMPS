import { Entity, PrimaryGeneratedColumn, Column, TableInheritance } from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'role' } }) // Ajout de la colonne discriminante
export class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  civilite!: string;

  @Column()
  nom!: string;

  @Column()
  prenom!: string;

  @Column()
  tel!: string;

  @Column()
  cne!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  login!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isAuthentificated!: boolean;

  @Column({ type: 'varchar', default: 'PERSON' }) // Défaut: Personne générique
  role!: string;
}
