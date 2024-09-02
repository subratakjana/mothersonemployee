import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrl: './family-details.component.scss'
})
export class FamilyDetailsComponent {
  familyDetailsForm: FormGroup;
  showMarriedDate: boolean = false;
  currentStep: number = 5;
  referenceForm: FormGroup;
  noRecordsFound = false;
  familyDetailsArray!: any;
  addreferenceArray!: any;
  addreferenceForm: FormGroup;
  temEmplyeeReferencesArray: any;
  emplyeeReferencesArray: any;
  addreferenceArrayNew: any;
  searchEmployeeReferenceText: string = '';
  references: any[] = []; // Initialize with your reference data
  filteredReferences: any[] = []; // This will hold the filtered results
  searchReferenceText: string = '';
  nominationForm: FormGroup;
  temnominationArray: any;
  nominationArray: any;

  /*references = [
    { name: 'John Doe', relation: 'Friend', email: 'john.doe@example.com', addressLine1: 'New City Lane', addressLine2: 'Lajpat Nagar', addressLine3: 'Lajpat Nagar', country: 'India', state: 'Delhi', city: 'New Delhi', pin: '110013', mobile: '9876543210', remarksData: 'N/A' },
    { name: 'Jane Smith', relation: 'Colleague', email: 'jane.smith@example.com', addressLine1: 'Old Town Road', addressLine2: 'Sector 12', addressLine3: 'Kalkaji', country: 'India', state: 'Delhi', city: 'New Delhi', pin: '110019', mobile: '9876543211', remarksData: 'Frequent contact' },
    { name: 'Alice Johnson', relation: 'Family', email: 'alice.johnson@example.com', addressLine1: 'Greenfield Avenue', addressLine2: 'Maidan Garhi', addressLine3: 'Vasant Kunj', country: 'India', state: 'Delhi', city: 'New Delhi', pin: '110070', mobile: '9876543212', remarksData: 'Close relative' },
    { name: 'Bob Brown', relation: 'Neighbor', email: 'bob.brown@example.com', addressLine1: 'Sunset Boulevard', addressLine2: 'Saket', addressLine3: 'Mehrauli', country: 'India', state: 'Delhi', city: 'New Delhi', pin: '110017', mobile: '9876543213', remarksData: 'Good neighbor' },
    { name: 'Charlie Davis', relation: 'Friend', email: 'charlie.davis@example.com', addressLine1: 'Maple Street', addressLine2: 'Chittaranjan Park', addressLine3: 'Lajpat Nagar', country: 'India', state: 'Delhi', city: 'New Delhi', pin: '110019', mobile: '9876543214', remarksData: 'Occasional contact' },
    { name: 'Emily White', relation: 'Colleague', email: 'emily.white@example.com', addressLine1: 'River Road', addressLine2: 'Hauz Khas', addressLine3: 'Safdarjung', country: 'India', state: 'Delhi', city: 'New Delhi', pin: '110016', mobile: '9876543215', remarksData: 'Project partner' },
    { name: 'Frank Black', relation: 'Family', email: 'frank.black@example.com', addressLine1: 'Hilltop Road', addressLine2: 'Dwarka', addressLine3: 'Sector 21', country: 'India', state: 'Delhi', city: 'New Delhi', pin: '110075', mobile: '9876543216', remarksData: 'Extended family' }
  ];*/
  //filteredReferences = [...this.references];


  constructor(private fb: FormBuilder, private router: Router) {
    this.familyDetailsForm = this.fb.group({
      fathersName: ['', Validators.required],
      fathersDOB: [''],
      mothersName: ['', Validators.required],
      mothersDOB: [''],
      married: [false],
      weddingAnniversary: [''],
      medicalFrom: [''],
      medicalTo: [''],
      extraPremiumSelf: [''],
      extraPremiumParent: [''],
      extraPremiumTopUpSelf: [''],
      extraPremiumTopUpParent: [''],

      spouseName: [''],
      spouseGender: [''],
      spouseDOB: [''],
      smedicalFrom: [''],
      smedicalTo: [''],
      onespouseName: [''],
      onespouseGender: [''],
      onespouseDOB: [''],
      onesmedicalFrom: [''],
      onesmedicalTo: [''],
      twospouseName: [''],
      twospouseGender: [''],
      twospouseDOB: [''],
      twosmedicalFrom: [''],
      twosmedicalTo: [''],


    });

    this.addreferenceForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      relation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      addressLine1: ['', [Validators.required, Validators.pattern(/^[\w\s.,-]+$/)]],
      addressLine2: [''],
      addressLine3: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pin: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      remarksData: ['']
    });
    this.nominationForm = this.fb.group({
      nomineeName: ['', [Validators.required, Validators.minLength(2)]],
      gratuity: ['', Validators.required],
      relation: ['', Validators.required],
      share: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    });

    this.referenceForm = this.fb.group({
      searchTerm: ['']
    });
  }

  validateNumericInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
  }

  onSaveAndNext(): void {
    if (this.familyDetailsForm.valid) {
      this.familyDetailsArray = [
        {
          fathersName: this.familyDetailsForm.controls['fathersName'].value,
          fathersDOB: this.familyDetailsForm.controls['fathersDOB'].value,
          mothersName: this.familyDetailsForm.controls['mothersName'].value,
          mothersDOB: this.familyDetailsForm.controls['mothersDOB'].value,
          weddingAnniversary: this.familyDetailsForm.controls['weddingAnniversary'].value,
          medicalFrom: this.familyDetailsForm.controls['medicalFrom'].value,
          medicalTo: this.familyDetailsForm.controls['medicalTo'].value,
          extraPremiumSelf: this.familyDetailsForm.controls['extraPremiumSelf'].value,
          extraPremiumParent: this.familyDetailsForm.controls['extraPremiumParent'].value,
          extraPremiumTopUpSelf: this.familyDetailsForm.controls['extraPremiumTopUpSelf'].value,
          extraPremiumTopUpParent: this.familyDetailsForm.controls['extraPremiumTopUpParent'].value,
          spouseName: this.familyDetailsForm.controls['spouseName'].value,
          spouseGender: this.familyDetailsForm.controls['spouseGender'].value,
          spouseDOB: this.familyDetailsForm.controls['spouseDOB'].value,
          smedicalFrom: this.familyDetailsForm.controls['smedicalFrom'].value,
          smedicalTo: this.familyDetailsForm.controls['smedicalTo'].value,
          onespouseName: this.familyDetailsForm.controls['onespouseName'].value,
          onespouseGender: this.familyDetailsForm.controls['onespouseGender'].value,
          onespouseDOB: this.familyDetailsForm.controls['onespouseDOB'].value,
          onesmedicalFrom: this.familyDetailsForm.controls['onesmedicalFrom'].value,
          onesmedicalTo: this.familyDetailsForm.controls['onesmedicalTo'].value,
          twospouseName: this.familyDetailsForm.controls['twospouseName'].value,
          twospouseGender: this.familyDetailsForm.controls['twospouseGender'].value,
          twospouseDOB: this.familyDetailsForm.controls['twospouseDOB'].value,
          twosmedicalFrom: this.familyDetailsForm.controls['twosmedicalFrom'].value,
          twosmedicalTo: this.familyDetailsForm.controls['twosmedicalTo'].value,
        },
      ];
      localStorage.setItem(
        'familyDetailsArray',
        JSON.stringify(this.familyDetailsArray)
      );
      console.log(this.familyDetailsForm.value);
      this.currentStep++;
      if (this.currentStep === 6) {
        this.router.navigate(['employee/experience-education-details']); // Navigate to the experience Details page
      }
      // Handle other steps and navigation
    }
    else {
      this.familyDetailsForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  onSaveRef(): void {
    if (this.addreferenceForm.valid) {
      console.log(this.emplyeeReferencesArray);
      this.emplyeeReferencesArray.push({
        name: this.addreferenceForm.controls['name'].value,
        relation: this.addreferenceForm.controls['relation'].value,
        email: this.addreferenceForm.controls['email'].value,
        addressLine1: this.addreferenceForm.controls['addressLine1'].value,
        addressLine2: this.addreferenceForm.controls['addressLine2'].value,
        addressLine3: this.addreferenceForm.controls['addressLine3'].value,
        country: this.addreferenceForm.controls['country'].value,
        state: this.addreferenceForm.controls['state'].value,
        city: this.addreferenceForm.controls['city'].value,
        pin: this.addreferenceForm.controls['pin'].value,
        mobile: this.addreferenceForm.controls['mobile'].value,
        remarksData: this.addreferenceForm.controls['remarksData'].value,
      });
      console.log(this.emplyeeReferencesArray);
      this.temEmplyeeReferencesArray = this.emplyeeReferencesArray;
      localStorage.setItem(
        'emplyeeReferencesArray',
        JSON.stringify(this.emplyeeReferencesArray)
      );
      this.addreferenceForm.reset();
    } else {
      this.addreferenceForm.markAllAsTouched();
      console.log('Form is invalid');
    }

    if (this.nominationForm.valid) {
      console.log(this.nominationArray);
      this.nominationArray.push({
        nomineeName: this.nominationForm.controls['nomineeName'].value,
        gratuity: this.nominationForm.controls['gratuity'].value,
        relation: this.nominationForm.controls['relation'].value,
        share: this.nominationForm.controls['share'].value,
      });
      console.log(this.nominationArray);
      this.temnominationArray = this.nominationArray;
      localStorage.setItem(
        'nominationArray',
        JSON.stringify(this.nominationArray)
      );
      this.nominationForm.reset();
    } else {
      this.nominationForm.markAllAsTouched();
      console.log('Form is invalid');
    }

  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      // Check if there's data in localStorage
      const storedData = localStorage.getItem('familyDetailsArray');
      if (storedData) {
        // Parse the stored data back into an object
        const parsedData = JSON.parse(storedData)[0];
        // Populate the form controls with the data
        this.familyDetailsForm.patchValue({
          fathersName: parsedData.fathersName,
          fathersDOB: parsedData.fathersDOB,
          mothersName: parsedData.mothersName,
          mothersDOB: parsedData.mothersDOB,
          weddingAnniversary: parsedData.weddingAnniversary,
          medicalFrom: parsedData.medicalFrom,
          medicalTo: parsedData.medicalTo,
          extraPremiumSelf: parsedData.extraPremiumSelf,
          extraPremiumParent: parsedData.extraPremiumParent,
          extraPremiumTopUpSelf: parsedData.extraPremiumTopUpSelf,
          extraPremiumTopUpParent: parsedData.extraPremiumTopUpParent,
          spouseName: parsedData.spouseName,
          spouseGender: parsedData.spouseGender,
          spouseDOB: parsedData.spouseDOB,
          smedicalFrom: parsedData.smedicalFrom,
          smedicalTo: parsedData.smedicalTo,
          onespouseName: parsedData.onespouseName,
          onespouseGender: parsedData.onespouseGender,
          onespouseDOB: parsedData.onespouseDOB,
          onesmedicalFrom: parsedData.onesmedicalFrom,
          onesmedicalTo: parsedData.onesmedicalTo,
          twospouseName: parsedData.twospouseName,
          twospouseGender: parsedData.twospouseGender,
          twospouseDOB: parsedData.twospouseDOB,
          twosmedicalFrom: parsedData.twosmedicalFrom,
          twosmedicalTo: parsedData.twosmedicalTo,
        });

        this.addreferenceForm.patchValue({
          name: parsedData.name,
          relation: parsedData.relation,
          email: parsedData.email,
          addressLine1: parsedData.addressLine1,
          addressLine2: parsedData.addressLine2,
          addressLine3: parsedData.addressLine3,
          country: parsedData.country,
          state: parsedData.state,
          city: parsedData.city,
          pin: parsedData.pin,
          mobile: parsedData.mobile,
          remarksData: parsedData.remarksData,
        });
      }
    }

    this.emplyeeReferencesArray = [];
    if (typeof window !== 'undefined') {
      const storedRefDetails = localStorage.getItem(
        'emplyeeReferencesArray'
      );
      console.log(storedRefDetails);
      if (storedRefDetails) {
        this.emplyeeReferencesArray = JSON.parse(storedRefDetails);
        this.temEmplyeeReferencesArray = this.emplyeeReferencesArray;
      }
    }

    this.nominationArray = [];
    if (typeof window !== 'undefined') {
      const storedRefDetails = localStorage.getItem(
        'nominationArray'
      );
      console.log(storedRefDetails);
      if (storedRefDetails) {
        this.nominationArray = JSON.parse(storedRefDetails);
        this.temnominationArray = this.nominationArray;
      }
    }

  }

  goBack(): void {
    this.router.navigate(['employee/contact-details']); // Adjust the route according to your needs
  }

  cancel(): void {
    this.router.navigate(['/employee-list']); // Navigate to the employee list page
  }

  onMarriedChange(): void {
    this.showMarriedDate = this.familyDetailsForm.get('married')?.value;
  }



  //Add Reference
  newReference = {
    name: '',
    relation: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    country: '',
    state: '',
    city: '',
    pin: '',
    mobile: '',
    remarksData: ''
  };


  resetForm() {
    this.newReference = {
      name: '',
      relation: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      country: '',
      state: '',
      city: '',
      pin: '',
      mobile: '',
      remarksData: ''
    };
  }

  searchReferenceByText(searchText: string) {
    const lowercasedSearchText = searchText ? searchText.toLowerCase() : ''; // Handle empty input  
    this.temEmplyeeReferencesArray = this.emplyeeReferencesArray.filter((item: any) => {
      return Object.keys(item).some(key =>
        item[key]?.toString().toLowerCase().includes(lowercasedSearchText)
      );
    });
  }

  searchNominationByText(searchText: string) {
    const lowercasedSearchText = searchText ? searchText.toLowerCase() : ''; // Handle empty input  
    this.temnominationArray = this.nominationArray.filter((item: any) => {
      return Object.keys(item).some(key =>
        item[key]?.toString().toLowerCase().includes(lowercasedSearchText)
      );
    });
  }
  

}
