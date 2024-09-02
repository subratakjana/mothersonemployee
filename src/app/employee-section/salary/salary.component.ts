import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
// Define the Company interface
interface Company {
  id: number;
  description: string;
  calcBase: number;
  type: string; // P.D
  calcPeriod: number;
  value: number;
  priority: string;
}
@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.scss'
})
export class SalaryComponent implements OnInit{
  salaryDetails: FormGroup;
  currentStep: number = 8;
  companyData: Company[] = [];
  filteredCompanyData: Company[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.salaryDetails = this.fb.group({
      Salaryrevisiondate: [''],
      Salaryeffective: [''],
      Salarystructure: [''],
      Reasonpredefined: ['']
    });
  }

  

  onSaveAndNext(): void {
    if (this.salaryDetails.valid) {
      console.log(this.salaryDetails.value);
      this.currentStep++;
      if (this.currentStep === 9) {
        this.router.navigate(['employee/confirmation-details']); // Navigate to the salary Details page
      }
      // Handle other steps and navigation
    } else {
      console.log('Form is invalid');
    }
  }
  goBack(): void {
    this.router.navigate(['employee/assets-docs-details']); // Adjust the route according to your needs
  }

  cancel(): void {
    this.router.navigate(['/employee-list']); // Navigate to the employee list page
  }

  ngOnInit(): void {
    this.loadCompanyData();
    this.filteredCompanyData = this.companyData; // Display all data by default
  }



// Method to load static data
loadCompanyData() {
  this.companyData = [
    { id: 3123, description: 'SMIIEL', calcBase: 23223, type: 'P', calcPeriod: 1, value: 0.00, priority: 'Medium' },
    { id: 3124, description: 'Company A', calcBase: 25000, type: 'P', calcPeriod: 1, value: 5000.00, priority: 'High' },
    { id: 3125, description: 'Company B', calcBase: 15000, type: 'P', calcPeriod: 2, value: 3000.00, priority: 'Low' },
    { id: 3126, description: 'Company C', calcBase: 27000, type: 'P', calcPeriod: 3, value: 7000.00, priority: 'High' },
    { id: 3127, description: 'Company D', calcBase: 18000, type: 'P', calcPeriod: 1, value: 2000.00, priority: 'Medium' },
    { id: 3128, description: 'Company E', calcBase: 22000, type: 'P', calcPeriod: 4, value: 4000.00, priority: 'Medium' },
    { id: 3129, description: 'Company F', calcBase: 30000, type: 'P', calcPeriod: 1, value: 6000.00, priority: 'High' },
    { id: 3130, description: 'Company G', calcBase: 26000, type: 'P', calcPeriod: 2, value: 1000.00, priority: 'Low' },
    { id: 3131, description: 'Company H', calcBase: 24000, type: 'P', calcPeriod: 3, value: 5500.00, priority: 'Medium' },
    { id: 3132, description: 'Company I', calcBase: 20000, type: 'P', calcPeriod: 4, value: 3000.00, priority: 'Low' },
];
}

// Method to search company by ID
searchCompany(event: Event) {
  const input = event.target as HTMLInputElement; // Cast the target to HTMLInputElement
  const companyId = input.value; // Get the value from the input field

  if (!companyId) {
      this.filteredCompanyData = this.companyData; // Reset to all data if input is empty
      return;
  }
  
  const idNumber = Number(companyId);
  this.filteredCompanyData = this.companyData.filter(company => company.id === idNumber);
}
}
