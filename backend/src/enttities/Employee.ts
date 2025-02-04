import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Department } from './Department';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Department, (department) => department.employees, { onDelete: 'CASCADE' })
  department: Department;
}