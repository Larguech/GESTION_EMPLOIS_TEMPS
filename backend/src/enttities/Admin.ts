import { ChildEntity, Entity, OneToMany } from "typeorm";
import { Person } from "./Person";
import { NonDisponibilite } from "./NonDisponibilite";
import { ElementDeModule } from "./ElementDeModule";

@Entity()
//@ChildEntity('ADMIN') // Specifies the discriminator value
export class Admin extends Person{
      @OneToMany(() => NonDisponibilite, (nonDisponibilite) => nonDisponibilite.enseignant, {
        /*eager: true,
        cascade: true,*/
        
      })
      nonDisponibilites: NonDisponibilite[];
    
      @OneToMany(() => ElementDeModule, (elementDeModule) => elementDeModule.enseignant, {
        eager: true,
        cascade: true,
        
      })
      elementDeModules: ElementDeModule[];
}