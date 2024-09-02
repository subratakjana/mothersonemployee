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
  contactDetailsArray!: any;

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
      this.contactDetailsArray = [
        {
          Mobileno: this.contactDetailsForm.controls['Mobileno'].value,
          Emergency1: this.contactDetailsForm.controls['Emergency1'].value,
          Emergency2: this.contactDetailsForm.controls['Emergency2'].value,
          Address1: this.contactDetailsForm.controls['Address1'].value,
          Address2: this.contactDetailsForm.controls['Address2'].value,
          Address3: this.contactDetailsForm.controls['Address3'].value,
          Country: this.contactDetailsForm.controls['Country'].value,
          State: this.contactDetailsForm.controls['State'].value,
          City: this.contactDetailsForm.controls['City'].value,
          Pincode: this.contactDetailsForm.controls['Pincode'].value,
          sameAsPresent: this.contactDetailsForm.controls['sameAsPresent'].value,
          pAddress1: this.contactDetailsForm.controls['pAddress1'].value,
          pAddress2: this.contactDetailsForm.controls['pAddress2'].value,
          pAddress3: this.contactDetailsForm.controls['pAddress3'].value,
          pCountry: this.contactDetailsForm.controls['pCountry'].value,
          pState: this.contactDetailsForm.controls['pState'].value,
          pCity: this.contactDetailsForm.controls['pCity'].value,
          pPincode: this.contactDetailsForm.controls['pPincode'].value,
        },
      ];
      localStorage.setItem(
        'contactDetailsArray',
        JSON.stringify(this.contactDetailsArray)
      );
      console.log(this.contactDetailsForm.value);
      this.currentStep++;
      if (this.currentStep === 5) {
        this.router.navigate(['employee/family-details']); // Navigate to the Family Details page
      }
      // Handle other steps and navigation
    } else {
      this.contactDetailsForm.markAllAsTouched();
      console.log('Form is invalid');
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

    if (typeof window !== 'undefined' && localStorage) {
      // Check if there's data in localStorage
      const storedData = localStorage.getItem('contactDetailsArray');
      if (storedData) {
        const parsedData = JSON.parse(storedData)[0];
        this.contactDetailsForm.patchValue({
          Mobileno: parsedData.Mobileno,
          Emergency1: parsedData.Emergency1,
          Emergency2: parsedData.Emergency2,
          Address1: parsedData.Address1,
          Address2: parsedData.Address2,
          Address3: parsedData.Address3,
          Country: parsedData.Country,
          State: parsedData.State,
          City: parsedData.City,
          Pincode: parsedData.Pincode,
          sameAsPresent: parsedData.sameAsPresent,
          pAddress1: parsedData.pAddress1,
          pAddress2: parsedData.pAddress2,
          pAddress3: parsedData.pAddress3,
          pCountry: parsedData.pCountry,
          pState: parsedData.pState,
          pCity: parsedData.pCity,
          pPincode: parsedData.pPincode,
        });
      }
    }
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
