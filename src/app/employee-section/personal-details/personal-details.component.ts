import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss'
})
export class PersonalDetailsComponent implements OnInit {
  personalDetailsForm: FormGroup;
  currentStep: number = 2;
  nationalIds: { value: string, label: string }[] = [];
  personalDetailsArray!: any;

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

    this.nationalIds = [
      { value: '1234-5678-9101', label: '1234-5678-9101' },
      { value: '2345-6789-1012', label: '2345-6789-1012' },
      { value: '3456-7891-0123', label: '3456-7891-0123' },
      { value: '4567-8910-1234', label: '4567-8910-1234' }
    ];

    if (typeof window !== 'undefined' && localStorage) {
      // Check if there's data in localStorage
      const storedData = localStorage.getItem('personalDetailsArray');
      if (storedData) {
        // Parse the stored data back into an object
        const parsedData = JSON.parse(storedData)[0];
        // Populate the form controls with the data
        this.personalDetailsForm.patchValue({
          DOB: parsedData.DOB,
          Birthplace: parsedData.Birthplace,
          Physicalstatus: parsedData.Physicalstatus,
          Bloodgroup: parsedData.Bloodgroup,
          Nationalid: parsedData.Nationalid,
          Personalemail: parsedData.Personalemail,
          pan_no: parsedData.pan_no,
          Aadhar_no: parsedData.Aadhar_no,
          Company_PF_no: parsedData.Company_PF_no,
          PRAN_number: parsedData.PRAN_number,
          Labour_card_no: parsedData.Labour_card_no,
          Passport_no: parsedData.Passport_no,
          Issuedon: parsedData.Issuedon,
          Validupto: parsedData.Validupto,
          PlaceOfIssue: parsedData.PlaceOfIssue,
        });
      }
    }

  }

  onSaveAndNext(): void {
    if (this.personalDetailsForm.valid) {
      this.personalDetailsArray = [
        {
          DOB: this.personalDetailsForm.controls['DOB'].value,
          Birthplace: this.personalDetailsForm.controls['Birthplace'].value,
          Physicalstatus: this.personalDetailsForm.controls['Physicalstatus'].value,
          Bloodgroup: this.personalDetailsForm.controls['Bloodgroup'].value,
          Nationalid: this.personalDetailsForm.controls['Nationalid'].value,
          Personalemail: this.personalDetailsForm.controls['Personalemail'].value,
          pan_no: this.personalDetailsForm.controls['pan_no'].value,
          Aadhar_no: this.personalDetailsForm.controls['Aadhar_no'].value,
          Company_PF_no: this.personalDetailsForm.controls['Company_PF_no'].value,
          PRAN_number: this.personalDetailsForm.controls['PRAN_number'].value,
          Labour_card_no: this.personalDetailsForm.controls['Labour_card_no'].value,
          Passport_no: this.personalDetailsForm.controls['Passport_no'].value,
          Issuedon: this.personalDetailsForm.controls['Issuedon'].value,
          Validupto: this.personalDetailsForm.controls['Validupto'].value,
          PlaceOfIssue: this.personalDetailsForm.controls['PlaceOfIssue'].value,
        },
      ];
      localStorage.setItem(
        'personalDetailsArray',
        JSON.stringify(this.personalDetailsArray)
      );
      console.log(this.personalDetailsForm.value);
      this.currentStep++;
      if (this.currentStep === 3) {
        this.router.navigate(['employee/account-details']); // Navigate to the Personal Details page
      }
      // Handle other steps and navigation
    } else {
      this.personalDetailsForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }


  goBack(): void {
    this.router.navigate(['employee/general-details']); // Adjust the route according to your needs
  }

  cancel(): void {
    this.router.navigate(['/employee-list']); // Navigate to the employee list page
  }

}
