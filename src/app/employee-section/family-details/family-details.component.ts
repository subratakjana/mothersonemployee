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


  references = [
    { name: 'John Doe', relation: 'Friend', email: 'john.doe@example.com', addressLine1: 'New City Lane', addressLine2: 'Lajpat Nagar', addressLine3: 'Lajpat Nagar', country: 'India', state: 'Delhi', city: 'New Delhi', pin: '110013', mobile: '9876543210', remarks: 'N/A' },
    { name: 'Jane Smith', relation: 'Colleague', email: 'jane.smith@example.com', addressLine1: 'Old Town Road', addressLine2: 'Sector 12', addressLine3: 'Kalkaji', country: 'India', state: 'Delhi', city: 'New Delhi', pin: '110019', mobile: '9876543211', remarks: 'Frequent contact' },
    { name: 'Alice Johnson', relation: 'Family', email: 'alice.johnson@example.com', addressLine1: 'Greenfield Avenue', addressLine2: 'Maidan Garhi', addressLine3: 'Vasant Kunj', country: 'India', state: 'Delhi', city: 'New Delhi', pin: '110070', mobile: '9876543212', remarks: 'Close relative' },
    { name: 'Bob Brown', relation: 'Neighbor', email: 'bob.brown@example.com', addressLine1: 'Sunset Boulevard', addressLine2: 'Saket', addressLine3: 'Mehrauli', country: 'India', state: 'Delhi', city: 'New Delhi', pin: '110017', mobile: '9876543213', remarks: 'Good neighbor' },
    { name: 'Charlie Davis', relation: 'Friend', email: 'charlie.davis@example.com', addressLine1: 'Maple Street', addressLine2: 'Chittaranjan Park', addressLine3: 'Lajpat Nagar', country: 'India', state: 'Delhi', city: 'New Delhi', pin: '110019', mobile: '9876543214', remarks: 'Occasional contact' },
    { name: 'Emily White', relation: 'Colleague', email: 'emily.white@example.com', addressLine1: 'River Road', addressLine2: 'Hauz Khas', addressLine3: 'Safdarjung', country: 'India', state: 'Delhi', city: 'New Delhi', pin: '110016', mobile: '9876543215', remarks: 'Project partner' },
    { name: 'Frank Black', relation: 'Family', email: 'frank.black@example.com', addressLine1: 'Hilltop Road', addressLine2: 'Dwarka', addressLine3: 'Sector 21', country: 'India', state: 'Delhi', city: 'New Delhi', pin: '110075', mobile: '9876543216', remarks: 'Extended family' }
  ];
  filteredReferences = [...this.references];


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
      extraPremiumTopUpParent:[''],

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
      console.log(this.familyDetailsForm.value);
      this.currentStep++;
      if (this.currentStep === 6) {
        this.router.navigate(['employee/experience-education-details']); // Navigate to the experience Details page
      }
      // Handle other steps and navigation
    } else {
      console.log('Form is invalid');
    }
  }

  next(): void {
    if (this.familyDetailsForm.valid) {
      this.currentStep++;
      if (this.currentStep === 6) {
        this.router.navigate(['employee/experience-education-details']); // Navigate to the experience Details page
      }
      // Handle other steps and navigation
    } else {
      this.familyDetailsForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
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

  ngOnInit(): void {
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
    remarks: ''
  };

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value;
    if (query.trim() === '') {
      this.filteredReferences = [...this.references];
      this.noRecordsFound = false;
    } else {
      const lowerCaseQuery = query.toLowerCase();
      this.filteredReferences = this.references.filter(reference =>
        Object.values(reference).some(value =>
          value.toString().toLowerCase().includes(lowerCaseQuery)
        )
      );
      this.noRecordsFound = this.filteredReferences.length === 0;
    }
  }

  addReference() {
    this.references.push({ ...this.newReference });
    this.filteredReferences = [...this.references];
    this.resetForm();
  }

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
      remarks: ''
    };
  }


}
