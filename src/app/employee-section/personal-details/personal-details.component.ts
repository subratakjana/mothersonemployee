import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss'
})
export class PersonalDetailsComponent implements OnInit{
  personalDetailsForm: FormGroup;
  currentStep: number = 2;

  constructor(private fb: FormBuilder, private router: Router) {
    this.personalDetailsForm = this.fb.group({
      DOB: ['', Validators.required],
      Birthplace: [''],
      Physicalstatus: [''],
      Bloodgroup: [''],
      Nationalid: ['', Validators.required],
      Personalemail: ['', [Validators.required, Validators.email]],

      pan_no: ['', Validators.required],
      Aadhar_no: ['', Validators.required],
      Company_PF_no: ['', Validators.required],
      PRAN_number: [''],
      Labour_card_no: [''],

      Passport_no: [''],
      Issuedon: [''],
      Validupto: [''],
      PlaceOfIssue: ['']
    });
  }

  ngOnInit(): void {
  }

  onSaveAndNext(): void {
    if (this.personalDetailsForm.valid) {
      console.log(this.personalDetailsForm.value);
      this.currentStep++;
      if (this.currentStep === 3) {
        this.router.navigate(['employee/account-details']); // Navigate to the Personal Details page
      }
      // Handle other steps and navigation
    } else {
      console.log('Form is invalid');
    }
  }

  next(): void {
    if (this.personalDetailsForm.valid) {
      this.currentStep++;
      if (this.currentStep === 3) {
        this.router.navigate(['employee/account-details']); // Navigate to the Personal Details page
      }
      // Handle other steps and navigation
    } else {
      this.personalDetailsForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }

  goBack(): void {
    this.router.navigate(['employee/general-details']); // Adjust the route according to your needs
  }

  cancel(): void {
    this.router.navigate(['/employee-list']); // Navigate to the employee list page
  }
  
}
