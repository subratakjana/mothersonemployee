import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-experience-education',
  templateUrl: './experience-education.component.html',
  styleUrl: './experience-education.component.scss'
})
export class ExperienceEducationComponent {
  educationDetailsForm: FormGroup;
  currentStep: number = 6;

  constructor(private fb: FormBuilder, private router: Router) {
    this.educationDetailsForm = this.fb.group({
      
    });
  }

  ngOnInit(): void {
  }

  onSaveAndNext(): void {
    if (this.educationDetailsForm.valid) {
      console.log(this.educationDetailsForm.value);
      this.currentStep++;
      if (this.currentStep === 7) {
        this.router.navigate(['employee/assets-docs-details']); // Navigate to the assets Details page
      }
      // Handle other steps and navigation
    } else {
      console.log('Form is invalid');
    }
  }

  next(): void {
    if (this.educationDetailsForm.valid) {
      this.currentStep++;
      if (this.currentStep === 7) {
        this.router.navigate(['employee/assets-docs-details']); // Navigate to the assets Details page
      }
      // Handle other steps and navigation
    } else {
      this.educationDetailsForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }

  goBack(): void {
    this.router.navigate(['employee/family-details']); // Adjust the route according to your needs
  }

  cancel(): void {
    this.router.navigate(['/employee-list']); // Navigate to the employee list page
  }
}
