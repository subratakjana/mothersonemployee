import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-contact-address',
  templateUrl: './contact-address.component.html',
  styleUrl: './contact-address.component.scss'
})
export class ContactAddressComponent {
  contactDetailsForm: FormGroup;
  currentStep: number = 4;

  constructor(private fb: FormBuilder, private router: Router) {
    this.contactDetailsForm = this.fb.group({
      Mobileno: [
        '',
        [Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10)
        ]
      ],
      Emergency1: ['', [Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
      Validators.maxLength(10)
      ]],
      Emergency2: ['', [Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
      Validators.maxLength(10)
      ]],
      Address1: ['', Validators.required],
      Address2: ['', Validators.required],
      Address3: ['', Validators.required],
      Country: ['', Validators.required],
      State: ['', Validators.required],
      City: ['', Validators.required],
      Pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      pAddress1: ['', Validators.required],
      pAddress2: ['', Validators.required],
      pAddress3: ['', Validators.required],
      pCountry: ['', Validators.required],
      pState: ['', Validators.required],
      pCity: ['', Validators.required],
      pPincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      sameAsPresent: [false]
    });
  }

  onSaveAndNext(): void {
    if (this.contactDetailsForm.valid) {
      console.log(this.contactDetailsForm.value);
      this.currentStep++;
      if (this.currentStep === 5) {
        this.router.navigate(['employee/family-details']); // Navigate to the Family Details page
      }
      // Handle other steps and navigation
    } else {
      console.log('Form is invalid');
    }
  }

  next(): void {
    if (this.contactDetailsForm.valid) {
      this.currentStep++;
      if (this.currentStep === 5) {
        this.router.navigate(['employee/family-details']); // Navigate to the Family Details page
      }
      // Handle other steps and navigation
    } else {
      this.contactDetailsForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }

  goBack(): void {
    this.router.navigate(['employee/account-details']); // Adjust the route according to your needs
  }

  cancel(): void {
    this.router.navigate(['/employee-list']); // Navigate to the employee list page
  }


  ngOnInit(): void {
    this.contactDetailsForm.get('sameAsPresent')?.valueChanges.subscribe(value => {
      if (value) {
        this.copyAddress();
      } else {
        this.clearPermanentAddress();
      }
    });
  }


  copyAddress(): void {
    const presentAddress = {
      pAddress1: this.contactDetailsForm.get('Address1')?.value,
      pAddress2: this.contactDetailsForm.get('Address2')?.value,
      pAddress3: this.contactDetailsForm.get('Address3')?.value,
      pCountry: this.contactDetailsForm.get('Country')?.value,
      pState: this.contactDetailsForm.get('State')?.value,
      pCity: this.contactDetailsForm.get('City')?.value,
      pPincode: this.contactDetailsForm.get('Pincode')?.value
    };
    this.contactDetailsForm.patchValue(presentAddress);
  }

  clearPermanentAddress(): void {
    this.contactDetailsForm.patchValue({
      pAddress1: '',
      pAddress2: '',
      pAddress3: '',
      pCountry: '',
      pState: '',
      pCity: '',
      pPincode: ''
    });
  }

}
