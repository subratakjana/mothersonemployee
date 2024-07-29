import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-confirmation-details',
  templateUrl: './confirmation-details.component.html',
  styleUrl: './confirmation-details.component.scss'
})
export class ConfirmationDetailsComponent {
  confirmationDetails: FormGroup;
  currentStep: number = 9;

  constructor(private fb: FormBuilder, private router: Router) {
    this.confirmationDetails = this.fb.group({
      
    });
  }

  ngOnInit(): void {
  }

  onSaveAndNext(): void {
    if (this.confirmationDetails.valid) {
      console.log(this.confirmationDetails.value);
      this.currentStep++;
      if (this.currentStep === 9) {
        this.router.navigate(['employee/confirmation-details']); // Navigate to the confirmation Details page
      }
      // Handle other steps and navigation
    } else {
      console.log('Form is invalid');
    }
  }

  next(): void {
    if (this.confirmationDetails.valid) {
      this.currentStep++;
      if (this.currentStep === 9) {
        this.router.navigate(['employee/confirmation-details']); // Navigate to the confirmation Details page
      }
      // Handle other steps and navigation
    } else {
      this.confirmationDetails.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }

  goBack(): void {
    this.router.navigate(['employee/salary-details']); // Adjust the route according to your needs
  }

  cancel(): void {
    this.router.navigate(['/employee-list']); // Navigate to the employee list page
  }
}
