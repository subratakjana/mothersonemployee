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
  directIndirectOptions: { value: string, label: string }[] = [];
  extendedDateReasons: { value: string, label: string }[] = [];
  generalDetailsArray !: any;

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

    // Initialize Direct/Indirect options
    this.directIndirectOptions = [
      { value: 'Direct', label: 'Direct' },
      { value: 'Indirect', label: 'Indirect' },
    ];

    // Hardcoded data for "Extended date reason"
    this.extendedDateReasons = [
      { value: 'Personal or Family Emergencies', label: 'Personal or Family Emergencies' },
      { value: 'Health Issues', label: 'Health Issues' },
      { value: 'Relocation Delays', label: 'Relocation Delays' },
      { value: 'Current Job Obligations', label: 'Current Job Obligations' },
      { value: 'Visa or Work Permit Delays', label: 'Visa or Work Permit Delays' },
      { value: 'Educational Commitments', label: 'Educational Commitments' },
      { value: 'Personal Commitments', label: 'Personal Commitments' },
      { value: 'Moving and Settling In', label: 'Moving and Settling In' },
      { value: 'Contractual Obligations', label: 'Contractual Obligations' },
      { value: 'Unforeseen Circumstances', label: 'Unforeseen Circumstances' },
      { value: 'Financial Considerations', label: 'Financial Considerations' },
      { value: 'Pending Background Checks or Formalities', label: 'Pending Background Checks or Formalities' },
    ];

  if (typeof window !== 'undefined' && localStorage) {
    // Check if there's data in localStorage
    const storedData = localStorage.getItem('generalDetailsArray');
    if (storedData) {
      // Parse the stored data back into an object
      const parsedData = JSON.parse(storedData)[0];
      // Populate the form controls with the data
      this.employeeForm.patchValue({
        Unitid: parsedData.Unitid,
        Employeetype: parsedData.Employeetype,
        Employeeid: parsedData.Employeeid,
        Salute: parsedData.Salute,
        Firstname: parsedData.Firstname,
        Middlename: parsedData.Middlename,
        Lastname: parsedData.Lastname,
        Gender: parsedData.Gender,
        emailid: parsedData.emailid,
        phoneno: parsedData.phoneno,
        WindowLogin: parsedData.WindowLogin,
        Domainname: parsedData.Domainname,
        DirectIndirect: parsedData.DirectIndirect,
        DeputationSD: parsedData.DeputationSD,
        DeputationeD: parsedData.DeputationeD,
        Deputationlocation: parsedData.Deputationlocation,
        Shiftrule: parsedData.Shiftrule,
        Remarks: parsedData.Remarks,
        interviewDate: parsedData.interviewDate,
        unitDOJ: parsedData.unitDOJ,
        groupDOJ: parsedData.groupDOJ,
        confirmed: parsedData.confirmed,
        confirmationDate: parsedData.confirmationDate,
        extendedMonth: parsedData.extendedMonth,
        extendedDateReason: parsedData.extendedDateReason,
        currentGroupExperience: parsedData.currentGroupExperience,
        department: parsedData.department,
        sectionCode: parsedData.sectionCode,
        designation: parsedData.designation,
        grade: parsedData.grade,
        location: parsedData.location,
        resignationDate: parsedData.resignationDate,
        unitDOL: parsedData.unitDOL,
        groupDOL: parsedData.groupDOL,
        reasonLeaving: parsedData.reasonLeaving,
        retirementDate: parsedData.retirementDate,
        profileImage: parsedData.profileImage,
      });

      // If you want to display the image in an <img> element
      if (parsedData.profileImage) {
        this.imagePreview = parsedData.profileImage; // Store the URL for use in the template
      }
    }
  }

  }

  onSaveAndNext(): void {
    if (this.employeeForm.valid) {
      this.generalDetailsArray = [
        {
          Unitid: this.employeeForm.controls['Unitid'].value,
          Employeetype: this.employeeForm.controls['Employeetype'].value,
          Employeeid: this.employeeForm.controls['Employeeid'].value,
          Salute: this.employeeForm.controls['Salute'].value,
          Firstname: this.employeeForm.controls['Firstname'].value,
          Middlename: this.employeeForm.controls['Middlename'].value,
          Lastname: this.employeeForm.controls['Lastname'].value,
          Gender: this.employeeForm.controls['Gender'].value,
          emailid: this.employeeForm.controls['emailid'].value,
          phoneno: this.employeeForm.controls['phoneno'].value,
          WindowLogin: this.employeeForm.controls['WindowLogin'].value,
          Domainname: this.employeeForm.controls['Domainname'].value,
          DirectIndirect: this.employeeForm.controls['DirectIndirect'].value,
          DeputationSD: this.employeeForm.controls['DeputationSD'].value,
          DeputationeD: this.employeeForm.controls['DeputationeD'].value,
          Deputationlocation:
            this.employeeForm.controls['Deputationlocation'].value,
          Shiftrule: this.employeeForm.controls['Shiftrule'].value,
          Remarks: this.employeeForm.controls['Remarks'].value,
          interviewDate: this.employeeForm.controls['interviewDate'].value,
          unitDOJ: this.employeeForm.controls['unitDOJ'].value,
          groupDOJ: this.employeeForm.controls['groupDOJ'].value,
          confirmed: this.employeeForm.controls['confirmed'].value,
          confirmationDate:
            this.employeeForm.controls['confirmationDate'].value,
          extendedMonth: this.employeeForm.controls['extendedMonth'].value,
          extendedDateReason:
            this.employeeForm.controls['extendedDateReason'].value,
          currentGroupExperience:
            this.employeeForm.controls['currentGroupExperience'].value,
          department: this.employeeForm.controls['department'].value,
          sectionCode: this.employeeForm.controls['sectionCode'].value,
          designation: this.employeeForm.controls['designation'].value,
          grade: this.employeeForm.controls['grade'].value,
          location: this.employeeForm.controls['location'].value,
          resignationDate: this.employeeForm.controls['resignationDate'].value,
          unitDOL: this.employeeForm.controls['unitDOL'].value,
          groupDOL: this.employeeForm.controls['groupDOL'].value,
          reasonLeaving: this.employeeForm.controls['reasonLeaving'].value,
          retirementDate: this.employeeForm.controls['retirementDate'].value,
          profileImage: this.employeeForm.controls['profileImage'].value,
        },
      ];
      localStorage.setItem(
        'generalDetailsArray',
        JSON.stringify(this.generalDetailsArray)
      );
      console.log(this.employeeForm.value);
      this.currentStep++;
      if (this.currentStep === 2) {
        this.router.navigate(['employee/personal-details']); // Navigate to the Personal Details page
      }
      // Handle other steps and navigation
    } else {
      this.employeeForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  validateNumericInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
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

      // Convert the image file to a dataURL for preview and storage
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Set the preview source

        // Save the dataURL (Base64 string) in the form control
        this.employeeForm.get('profileImage')?.setValue(reader.result);
      };
      reader.readAsDataURL(file);
    }
  } 
  

  //Confirm Check
  onConfirmedChange(): void {
    this.showConfirmationDate = this.employeeForm.get('confirmed')?.value;
  }




}
