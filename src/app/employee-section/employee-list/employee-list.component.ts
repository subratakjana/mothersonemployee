import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router'; // Import Router
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EmployeeListComponent implements OnInit {

  @ViewChild('dt1') dt1!: Table; // Ensure the correct type is used
  value: string | undefined;
  customers: any;
  loading: boolean = true;
  selectedCustomers: any;
  activityValues: number[] = [0, 100];
  statuses!: any[];
  searchValue: any;

  constructor( private router: Router) {
    
  }

  ngOnInit(): void {
    this.customers = [
      {
        id: 1292,
        name: 'Dashisht Bhardwaj',
        department: 'SWS',
        designation: 'Associate Project Manager',
        gender: 'Male',
        reporting_manager: 'Alok Aman',
        company_doj: '05-18-2010',
        Group_doj: '05-18-2010',
        status: 'Inactive'
      },
      {
        id: 1984,
        name: 'Manoj Chand',
        department: 'SWS',
        designation: 'Senior Module Leader',
        gender: 'Male',
        reporting_manager: 'Sachin Gupta',
        company_doj: '10-25-2010',
        Group_doj: '10-25-2010',
        status: 'Active'
      },
      {
        id: 1509,
        name: 'Ashutosh Kumar',
        department: 'Materials',
        designation: 'Project Manager',
        gender: 'Male',
        reporting_manager: 'Virender Devkaran',
        company_doj: '07-04-2011',
        Group_doj: '07-04-2011',
        status: 'Draft'
      },
      {
        id: 1871,
        name: 'Pramod Kumar',
        department: 'SAP',
        designation: 'Assistant General Manager',
        gender: 'Male',
        reporting_manager: 'Pramod Kumar',
        company_doj: '07-15-2013',
        Group_doj: '07-15-2013',
        status: 'Draft'
      },
      {
        id: 1292,
        name: 'Dashisht Bhardwaj',
        department: 'SWS',
        designation: 'Associate Project Manager',
        gender: 'Male',
        reporting_manager: 'Alok Aman',
        company_doj: '05-18-2010',
        Group_doj: '05-18-2010',
        status: 'Inactive'
      },
      {
        id: 1984,
        name: 'Manoj Chand',
        department: 'SWS',
        designation: 'Senior Module Leader',
        gender: 'Male',
        reporting_manager: 'Sachin Gupta',
        company_doj: '10-25-2010',
        Group_doj: '10-25-2010',
        status: 'Active'
      },
      {
        id: 1509,
        name: 'Ashutosh Kumar',
        department: 'Materials',
        designation: 'Project Manager',
        gender: 'Male',
        reporting_manager: 'Virender Devkaran',
        company_doj: '07-04-2011',
        Group_doj: '07-04-2011',
        status: 'Draft'
      },
      {
        id: 1871,
        name: 'Pramod Kumar',
        department: 'SAP',
        designation: 'Assistant General Manager',
        gender: 'Male',
        reporting_manager: 'Pramod Kumar',
        company_doj: '07-15-2013',
        Group_doj: '07-15-2013',
        status: 'Draft'
      }
    ];

    this.statuses = [
      { label: 'Inactive', value: 'inactive' },
      { label: 'Active', value: 'active' },
      { label: 'Draft', value: 'draft' }
    ];
  }


  getSeverity(status: string): "danger" | "success" | "info" | undefined {
    switch (status) {
      case 'inactive':
        return 'danger';
      case 'active':
        return 'success';
      case 'draft':
        return 'info';
      default:
        return undefined;
    }
  }

  onGlobalFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.dt1.filterGlobal(inputElement.value, 'contains');
  }

  onSubmit() {
   
  }

  addemployee(): void {
    this.router.navigate(['employee/general-details']); // Navigate to the employee list page
  }
}

