import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-experience-education',
  templateUrl: './experience-education.component.html',
  styleUrl: './experience-education.component.scss',
})
export class ExperienceEducationComponent {
  educationDetailsForm: FormGroup;
  educationDetailsArray!: any;
  tempEducationDetailsArray: any;
  experienceDetailsForm: FormGroup;
  experienceDetailsArray: any;
  tempExperienceDetailsArray: any;
  currentStep: number = 6;
  searchExperienceText: string = '';
  searchEducationText: string = '';
  experienceEducationDetailsForm: FormGroup;
  totalExperience: number = 0;

  constructor(private fb: FormBuilder, private router: Router) {
    this.educationDetailsForm = this.fb.group({
      qualification: ['', Validators.required],
      course: ['', Validators.required],
      university: ['', Validators.required],
      cgpa: ['', Validators.required],
      passingyear: ['', Validators.required],
    });

    this.experienceDetailsForm = this.fb.group({
      companyname: ['', Validators.required],
      yearsexperience: ['', Validators.required],
      expSwitchCheckChecked: [''],
    });

    this.experienceEducationDetailsForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.experienceDetailsArray = [];
    this.educationDetailsArray = [];
    if (typeof window !== 'undefined') {
      const storedExperienceDetails = localStorage.getItem(
        'experienceDetailsArray'
      );
      console.log(storedExperienceDetails);
      if (storedExperienceDetails) {
        this.experienceDetailsArray = JSON.parse(storedExperienceDetails);
        this.tempExperienceDetailsArray = this.experienceDetailsArray;
        this.calculateTotalExperience();
      }
      const storedEducationDetails = localStorage.getItem(
        'educationDetailsArray'
      );
      console.log(storedEducationDetails);
      if (storedEducationDetails) {
        this.educationDetailsArray = JSON.parse(storedEducationDetails);
        this.tempEducationDetailsArray = this.educationDetailsArray;
      }
    }
  }

  onSaveExperience(): void {
    if (this.experienceDetailsForm.valid) {
      this.tempExperienceDetailsArray = this.experienceDetailsArray;

      console.log(this.experienceDetailsForm.controls['companyname'].value);
      this.experienceDetailsArray.push({
        companyname: this.experienceDetailsForm.controls['companyname'].value,
        yearsexperience:
          this.experienceDetailsForm.controls['yearsexperience'].value,
        expSwitchCheckChecked:
          this.experienceDetailsForm.controls['expSwitchCheckChecked'].value,
      });
      this.calculateTotalExperience();
      // Reset the form after submission
      this.experienceDetailsForm.reset();
      console.log(this.experienceDetailsArray);
      // Handle other steps and navigation
    } else {
      this.experienceDetailsForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
  onSaveEducation(): void {
    if (this.educationDetailsForm.valid) {
      this.tempEducationDetailsArray = this.educationDetailsArray;

      console.log(this.educationDetailsForm.controls['qualification'].value);

      this.educationDetailsArray.push({
        qualification:
          this.educationDetailsForm.controls['qualification'].value,
        course: this.educationDetailsForm.controls['course'].value,
        university: this.educationDetailsForm.controls['university'].value,
        cgpa: this.educationDetailsForm.controls['cgpa'].value,
        passingyear: this.educationDetailsForm.controls['passingyear'].value,
      });
      console.log(this.educationDetailsArray);
      this.educationDetailsForm.reset();
    } else {
      this.educationDetailsForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
  onSaveAndNext(): void {
    if (this.experienceEducationDetailsForm.valid) {
      localStorage.setItem(
        'experienceDetailsArray',
        JSON.stringify(this.experienceDetailsArray)
      );
      localStorage.setItem(
        'educationDetailsArray',
        JSON.stringify(this.educationDetailsArray)
      );
      this.currentStep++;
      if (this.currentStep === 7) {
        this.router.navigate(['employee/assets-docs-details']); // Navigate to the assets Details page
      }
    } else {
      console.log('Form is invalid');
    }
  }

  next(): void {
    if (this.educationDetailsForm.valid) {
      this.currentStep++;
      if (this.currentStep === 7) {
        this.router.navigate(['employee/assets-docs-details']); // Navigate to the assets Details page
      }
      // Handle other steps and navigation
    } else {
      this.educationDetailsForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }

  goBack(): void {
    this.router.navigate(['employee/family-details']); // Adjust the route according to your needs
  }

  cancel(): void {
    this.router.navigate(['/employee-list']); // Navigate to the employee list page
  }

   searchExperienceByText(searchText: string) {
    const lowercasedSearchText = searchText.toLowerCase();    
    this.tempExperienceDetailsArray = this.experienceDetailsArray.filter((item: any) => {
      return Object.keys(item).some(key => 
        item[key]?.toString().toLowerCase().includes(lowercasedSearchText)
      );
    });
    console.log(lowercasedSearchText);
  }

  searchEducationByText(searchText: string) {
    const lowercasedSearchText = searchText.toLowerCase();    
    this.tempEducationDetailsArray = this.educationDetailsArray.filter((item: any) => {
      return Object.keys(item).some(key => 
        item[key]?.toString().toLowerCase().includes(lowercasedSearchText)
      );
    });
    console.log(lowercasedSearchText);
  }

  //Calculate Total Experience
  calculateTotalExperience(): void {
    this.totalExperience = this.experienceDetailsArray
      .map((item: { yearsexperience: number }) => item.yearsexperience)
      .reduce((acc: number, curr: number) => acc + curr, 0);
  }
}
