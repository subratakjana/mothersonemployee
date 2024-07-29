import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.scss'
})
export class SalaryComponent {
  salaryDetails: FormGroup;
  currentStep: number = 8;

  constructor(private fb: FormBuilder, private router: Router) {
    this.salaryDetails = this.fb.group({
      Salaryrevisiondate: [''],
      Salaryeffective: [''],
      Salarystructure: ['', [Validators.pattern(/^\d+$/)]],
      Reasonpredefined:['']
    });
  }

  ngOnInit(): void {
  }

  onSaveAndNext(): void {
    if (this.salaryDetails.valid) {
      console.log(this.salaryDetails.value);
      this.currentStep++;
      if (this.currentStep === 9) {
        this.router.navigate(['employee/salary-details']); // Navigate to the salary Details page
      }
      // Handle other steps and navigation
    } else {
      console.log('Form is invalid');
    }
  }

  next(): void {
    if (this.salaryDetails.valid) {
      this.currentStep++;
      if (this.currentStep === 9) {
        this.router.navigate(['employee/salary-details']); // Navigate to the salary Details page
      }
      // Handle other steps and navigation
    } else {
      this.salaryDetails.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }

  goBack(): void {
    this.router.navigate(['employee/assets-docs-details']); // Adjust the route according to your needs
  }

  cancel(): void {
    this.router.navigate(['/employee-list']); // Navigate to the employee list page
  }
}
