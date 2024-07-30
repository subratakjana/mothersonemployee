import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-general-details',
  templateUrl: './general-details.component.html',
  styleUrls: ['./general-details.component.scss']
})
export class GeneralDetailsComponent implements OnInit {
  employeeForm: FormGroup;
  currentStep: number = 1;
  showConfirmationDate: boolean = false;
  imagePreview: string | ArrayBuffer | null = null; // To hold the image preview

  bsConfig = {
    dateInputFormat: 'YYYY-MM-DD'
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.employeeForm = this.fb.group({
      Globalid: [{ value: '', disabled: true }, Validators.required],
      Unitid: ['', Validators.required],
      Employeetype: ['', Validators.required],
      Employeeid: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      Salute: ['', Validators.required],
      Firstname: ['', Validators.required],
      Middlename: [''],
      Lastname: ['', Validators.required],
      Gender: ['', Validators.required],
      emailid: ['', [Validators.required, Validators.email]],
      phoneno: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      WindowLogin: [''],
      Domainname: [''],
      DirectIndirect: ['', Validators.required],
      DeputationSD: [''],
      DeputationeD: [''],
      Deputationlocation: [''],
      Shiftrule: [''],
      Remarks: [''],
      profileImage: ['', Validators.required],
      interviewDate: [''],
      unitDOJ: ['', Validators.required],
      groupDOJ: ['', Validators.required],
      confirmed: [false],
      confirmationDate: [''],
      extendedMonth: [''],
      extendedDateReason: [''],
      currentGroupExperience: [''],
      department: [''],
      sectionCode: [''],
      designation: [''],
      grade: [''],
      location: [''],
      resignationDate: [''],
      unitDOL: [''],
      groupDOL: [''],
      reasonLeaving: [''],
      retirementDate: ['']
    });
  }

  ngOnInit(): void {
    // Subscribe to the checkbox value changes
    this.employeeForm.get('confirmed')?.valueChanges.subscribe(value => {
      this.showConfirmationDate = value;
      if (!value) {
        // Reset confirmationDate field if checkbox is unchecked
        this.employeeForm.get('confirmationDate')?.reset();
      }
    });
  }

  onSaveAndNext(): void {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      this.currentStep++;
      if (this.currentStep === 2) {
        this.router.navigate(['employee/personal-details']); // Navigate to the Personal Details page
      }
      // Handle other steps and navigation
    } else {
      console.log('Form is invalid');
    }
  }

  validateNumericInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
  }

  
  next(): void {
    if (this.employeeForm.valid) {
      this.currentStep++;
      if (this.currentStep === 2) {
        this.router.navigate(['employee/personal-details']); // Navigate to the Personal Details page
      }
      // Handle other steps and navigation
    } else {
      this.employeeForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }

  goBack(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  
  cancel(): void {
    this.router.navigate(['/employee-list']); // Navigate to the employee list page
  }

  // File Upload check the image
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Check if the selected file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        input.value = ''; // Clear the file input
        this.imagePreview = null; // Clear the preview
        return;
      }

      // Show the image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Set the preview source
      };
      reader.readAsDataURL(file);

      // Optionally set the file in the form control
      this.employeeForm.get('profileImage')?.setValue(file);
    }
  }

  //Confirm Check
  onConfirmedChange(): void {
    this.showConfirmationDate = this.employeeForm.get('confirmed')?.value;
  }

}
