import { SalleService } from 'src/app/services/salle.service';
import { DepartmentService } from 'src/app/services/department.service';
import { ProfServiceService } from 'src/app/services/prof-service.service';
import { Component, OnInit } from '@angular/core';
import { ClasseService } from 'src/app/services/classe.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent  implements OnInit
{
  nombreDepartements:number=0;
  nombreProfs:number=0;
  nombreClasses:number=0;
  nombreSalles:number=0;

  
    constructor(private dpService:DepartmentService,private prfService:ProfServiceService,private clsService:ClasseService,private salleService: SalleService) { }
  
    ngOnInit(): void {
      this.getNbDepartements();
      this.getNbProfs();
      this.getNbClasses();
      
      this.getNbSalles();
    }
    getNbDepartements() {
       this.dpService.searchDepartments2().subscribe(
      (data) => {
        this.nombreDepartements= data;
      }
    );
    }
    getNbProfs() {
      this.prfService.getProfscount().subscribe(
      (data) => {
        this.nombreProfs= data;
      }
    );
    }
    getNbClasses() {
      this.clsService.getClasses2().subscribe(
      (data) => {
        this.nombreClasses= data;
        console.log(this.nombreClasses)
        console.log("hi")
      }
    );
    }
    getNbSalles() {
      this.salleService.getSallescount().subscribe(
      (data) => {
        this.nombreSalles= data;
      }
    );
    }


}
