import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-assets-docs',
  templateUrl: './assets-docs.component.html',
  styleUrl: './assets-docs.component.scss'
})
export class AssetsDocsComponent {
 assatsDetailsForm: FormGroup;
  currentStep: number = 7;

  constructor(private fb: FormBuilder, private router: Router) {
    this.assatsDetailsForm = this.fb.group({
      
    });
  }

  ngOnInit(): void {
  }

  onSaveAndNext(): void {
    if (this.assatsDetailsForm.valid) {
      console.log(this.assatsDetailsForm.value);
      this.currentStep++;
      if (this.currentStep === 8) {
        this.router.navigate(['employee/salary-details']); // Navigate to the salary Details page
      }
      // Handle other steps and navigation
    } else {
      console.log('Form is invalid');
    }
  }

  next(): void {
    if (this.assatsDetailsForm.valid) {
      this.currentStep++;
      if (this.currentStep === 8) {
        this.router.navigate(['employee/salary-details']); // Navigate to the salary Details page
      }
      // Handle other steps and navigation
    } else {
      this.assatsDetailsForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }

  goBack(): void {
    this.router.navigate(['employee/experience-education-details']); // Adjust the route according to your needs
  }

  cancel(): void {
    this.router.navigate(['/employee-list']); // Navigate to the employee list page
  }
}
