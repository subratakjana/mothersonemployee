import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router'; // Import Router
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
interface Customer {
  id: number;
  name: string;
  department: string;
  designation: string;
  gender: string;
  reporting_manager: string;
  company_doj: string; // Date as a string
  Group_doj: string;   // Date as a string
  status: string;
  unitId?: string;       // Optional
  employeeType?: string; // Optional
}

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
  totalCustomers: number | undefined;
  activeCustomers: number | undefined;
  inactiveCustomers: number | undefined;
  draftCustomers: number | undefined;
  filteredCustomers = []; // To store filtered data based on the active tab
  activeTab: string = 'All'; // Default to 'All'
  uniqueCustomerIds: number[] = [];
  uniqueDepartments: string[] = [];
  uniqueEmployeeNames: string[] = [];

  selectedUnitId: string | undefined = 'All';
  selectedEmployeeType: string | undefined = 'All';
  selectedEmployeeName: string | undefined = 'All';
  originalCustomers: any;
  // originalCustomers: Customer[] = [];


  constructor(private router: Router) {
  }

  ngOnInit(): void { // Initially display all customers

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
        id: 1510,
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
        id: 1293,
        name: 'Sam Bhardwaj',
        department: 'SWS',
        designation: 'Associate Project Manager',
        gender: 'Male',
        reporting_manager: 'Alok Aman',
        company_doj: '05-18-2010',
        Group_doj: '05-18-2010',
        status: 'Inactive'
      },
      {
        id: 1985,
        name: 'Ram Chand',
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
        name: 'Monodip Kumar',
        department: 'Materials',
        designation: 'Project Manager',
        gender: 'Male',
        reporting_manager: 'Virender Devkaran',
        company_doj: '07-04-2011',
        Group_doj: '07-04-2011',
        status: 'Draft'
      },
      {
        id: 1879,
        name: 'Prokash Kumar',
        department: 'SAP',
        designation: 'Assistant General Manager',
        gender: 'Male',
        reporting_manager: 'Pramod Kumar',
        company_doj: '07-15-2013',
        Group_doj: '07-15-2013',
        status: 'Draft'
      },
      {
        id: 1873,
        name: 'Sunil Kumar',
        department: 'SAP',
        designation: 'Assistant General Manager',
        gender: 'Male',
        reporting_manager: 'Pramod Kumar',
        company_doj: '07-15-2013',
        Group_doj: '07-15-2013',
        status: 'Active'
      },
      {
        id: 1872,
        name: 'Subrata Kumar',
        department: 'SAP',
        designation: 'Assistant General Manager',
        gender: 'Male',
        reporting_manager: 'Pramod Kumar',
        company_doj: '07-15-2013',
        Group_doj: '07-15-2013',
        status: 'Inactive'
      }
    ];
    this.originalCustomers = [...this.customers]; // Create a copy of the customers array
    this.filteredCustomers = this.customers;

    // Initialize unique values for dropdowns
    this.uniqueEmployeeNames = Array.from(new Set(this.customers.map((customer: { name: any; }) => customer.name)));

    // Initialize default values for dropdowns
    this.selectedEmployeeName = 'All';

    // Call getData() initially to display all data
    this.getData();


    this.statuses = [
      { label: 'Inactive', value: 'inactive' },
      { label: 'Active', value: 'active' },
      { label: 'Draft', value: 'draft' }
    ];

    this.totalCustomers = this.customers.length;
    this.activeCustomers = this.customers.filter((customer: { status: string; }) => customer.status === 'Active').length;
    this.inactiveCustomers = this.customers.filter((customer: { status: string; }) => customer.status === 'Inactive').length;
    this.draftCustomers = this.customers.filter((customer: { status: string; }) => customer.status === 'Draft').length;
    this.filterCustomers(this.activeTab);


    this.uniqueCustomerIds = Array.from(new Set(this.customers.map((customer: { id: any; }) => customer.id)));
    this.uniqueDepartments = Array.from(new Set(this.customers.map((customer: { department: any; }) => customer.department)));
    this.uniqueEmployeeNames = Array.from(new Set(this.customers.map((customer: { name: any; }) => customer.name)));
  }

  filterCustomers(tab: string): void {
    this.activeTab = tab;
    if (tab === 'All') {
      this.filteredCustomers = this.customers;
    } else {
      this.filteredCustomers = this.customers.filter((customer: { status: string; }) => customer.status === tab);
    }
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
    const input = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredCustomers = this.customers.filter((customer: { [s: string]: unknown; } | ArrayLike<unknown>) => {
      return Object.values(customer).some((val) => {
        // Type assertion here to ensure val is string | number | undefined
        const value = val as string | number | undefined;
        return value ? value.toString().toLowerCase().includes(input) : false;
      });
    });
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.customers);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
    XLSX.writeFile(workbook, 'customers.xlsx');
  }


  onSubmit() {

  }

  addemployee(): void {
    this.router.navigate(['employee/general-details']); // Navigate to the employee list page
  }

  getData() {
    console.log(this.selectedUnitId);
    if (!this.originalCustomers) {
      console.error('originalCustomers is not defined');
      return;
    }
    this.filteredCustomers = this.originalCustomers.filter((customer: any) => {
      const matchesUnitId = this.selectedUnitId === 'All' || customer.id === Number(this.selectedUnitId);
      const matchesEmployeeType = this.selectedEmployeeType === 'All' || customer.department === this.selectedEmployeeType;
      const matchesEmployeeName = this.selectedEmployeeName === 'All' || customer.name === this.selectedEmployeeName;
      //console.log(matchesEmployeeType);
      return matchesUnitId && matchesEmployeeType && matchesEmployeeName;
    });
    
    if (this.filteredCustomers.length === 0) {
      console.log('No customers found with the selected filters.');
    }
  }
  
  

}

