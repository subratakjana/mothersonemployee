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
  bankDetailsArray!: any;

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
    if (typeof window !== 'undefined' && localStorage) {
      // Check if there's data in localStorage
      const storedData = localStorage.getItem('bankDetailsArray');
      if (storedData) {
        // Parse the stored data back into an object
        const parsedData = JSON.parse(storedData)[0];
        // Populate the form controls with the data
        this.accountDetailsForm.patchValue({
          PFno: parsedData.PFno,
          UAN_no: parsedData.UAN_no,
          ESI_no: parsedData.ESI_no,
          ESI_registered: parsedData.ESI_registered,
          Dispensory: parsedData.Dispensory,
          EDLIno: parsedData.EDLIno,
          Gratuityno: parsedData.Gratuityno,
          Super: parsedData.Super,
          Saving_Paymentmode: parsedData.Saving_Paymentmode,
          Saving_Bankid: parsedData.Saving_Bankid,
          Saving_Accountno: parsedData.Saving_Accountno,
          Saving_IFSCcode: parsedData.Saving_IFSCcode,
          Current_Paymentmode: parsedData.Current_Paymentmode,
          Current_Bankid: parsedData.Current_Bankid,
          Current_Accountno: parsedData.Current_Accountno,
          Current_IFSCcode: parsedData.Current_IFSCcode,
        });
      }
    }
  }

  onSaveAndNext(): void {
    if (this.accountDetailsForm.valid) {
      this.bankDetailsArray = [
        {
          PFno: this.accountDetailsForm.controls['PFno'].value,
          UAN_no: this.accountDetailsForm.controls['UAN_no'].value,
          ESI_no: this.accountDetailsForm.controls['ESI_no'].value,
          ESI_registered: this.accountDetailsForm.controls['ESI_registered'].value,
          Dispensory: this.accountDetailsForm.controls['Dispensory'].value,
          EDLIno: this.accountDetailsForm.controls['EDLIno'].value,
          Gratuityno: this.accountDetailsForm.controls['Gratuityno'].value,
          Super: this.accountDetailsForm.controls['Super'].value,
          Saving_Paymentmode: this.accountDetailsForm.controls['Saving_Paymentmode'].value,
          Saving_Bankid: this.accountDetailsForm.controls['Saving_Bankid'].value,
          Saving_Accountno: this.accountDetailsForm.controls['Saving_Accountno'].value,
          Saving_IFSCcode: this.accountDetailsForm.controls['Saving_IFSCcode'].value,
          Current_Paymentmode: this.accountDetailsForm.controls['Current_Paymentmode'].value,
          Current_Bankid: this.accountDetailsForm.controls['Current_Bankid'].value,
          Current_Accountno: this.accountDetailsForm.controls['Current_Accountno'].value,
          Current_IFSCcode: this.accountDetailsForm.controls['Current_IFSCcode'].value,
        },
      ];
      localStorage.setItem(
        'bankDetailsArray',
        JSON.stringify(this.bankDetailsArray)
      );
      console.log(this.accountDetailsForm.value);
      this.currentStep++;
      if (this.currentStep === 4) {
        this.router.navigate(['employee/contact-details']); // Navigate to the Personal Details page
      }
      // Handle other steps and navigation
    } else {
      this.accountDetailsForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  goBack(): void {
    this.router.navigate(['employee/personal-details']); // Adjust the route according to your needs
  }

  cancel(): void {
    this.router.navigate(['/employee-list']); // Navigate to the employee list page
  }
}
