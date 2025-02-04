import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { Departement } from 'src/app/models/departement.models';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Departement[] = [];

  constructor(private dpService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.dpService.getDepartements().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
      }
    });
  }
}