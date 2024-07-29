import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-bank-pf-esi',
  templateUrl: './bank-pf-esi.component.html',
  styleUrl: './bank-pf-esi.component.scss'
})
export class BankPfEsiComponent {
  accountDetailsForm: FormGroup;
  currentStep: number = 3;

  constructor(private fb: FormBuilder, private router: Router) {
    this.accountDetailsForm = this.fb.group({
      PFno: [''],
      UAN_no: [''],
      ESI_no: [''],
      ESI_registered: [''],
      Dispensory: [''],
      EDLIno: [''],
      Gratuityno: [''],
      Super: [''],

      Saving_Paymentmode: ['', Validators.required],
      Saving_Bankid: ['', Validators.required],
      Saving_Accountno: ['', Validators.required],
      Saving_IFSCcode: ['', Validators.required],
      Current_Paymentmode: [''],
      Current_Bankid: [''],
      Current_Accountno: [''],
      Current_IFSCcode: [''],
    });
  }

  ngOnInit(): void {
  }

  onSaveAndNext(): void {
    if (this.accountDetailsForm.valid) {
      console.log(this.accountDetailsForm.value);
      this.currentStep++;
      if (this.currentStep === 4) {
        this.router.navigate(['employee/contact-details']); // Navigate to the Personal Details page
      }
      // Handle other steps and navigation
    } else {
      console.log('Form is invalid');
    }
  }

  next(): void {
    if (this.accountDetailsForm.valid) {
      this.currentStep++;
      if (this.currentStep === 4) {
        this.router.navigate(['employee/contact-details']); // Navigate to the Personal Details page
      }
      // Handle other steps and navigation
    } else {
      this.accountDetailsForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }

  goBack(): void {
    this.router.navigate(['employee/personal-details']); // Adjust the route according to your needs
  }

  cancel(): void {
    this.router.navigate(['/employee-list']); // Navigate to the employee list page
  }
}
