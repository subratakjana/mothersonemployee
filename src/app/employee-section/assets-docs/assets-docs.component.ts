import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-assets-docs',
  templateUrl: './assets-docs.component.html',
  styleUrl: './assets-docs.component.scss',
})
export class AssetsDocsComponent {
  assatsDetailsForm: FormGroup;
  currentStep: number = 7;
  assetsDetailsArray!: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.assatsDetailsForm = this.fb.group({
      Vehicle: [''],
      Vehicleno: [''],
      Licenseno: [''],
      Transportcode: [''],
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      // Check if there's data in localStorage
      const storedData = localStorage.getItem('assetsDetailsArray');
      if (storedData) {
        // Parse the stored data back into an object
        const parsedData = JSON.parse(storedData)[0];
        // Populate the form controls with the data
        this.assatsDetailsForm.patchValue({
          Vehicle: parsedData.Vehicle,
          Vehicleno: parsedData.Vehicleno,
          Licenseno: parsedData.Licenseno,
          Transportcode: parsedData.Transportcode,
        });
      }
    }

  }

  onSaveAndNext(): void {
    if (this.assatsDetailsForm.valid) {
      this.assetsDetailsArray = [
        {
          Vehicle: this.assatsDetailsForm.controls['Vehicle'].value,
          Vehicleno: this.assatsDetailsForm.controls['Vehicleno'].value,
          Licenseno: this.assatsDetailsForm.controls['Licenseno'].value,
          Transportcode: this.assatsDetailsForm.controls['Transportcode'].value,
        },
      ];
      localStorage.setItem(
        'assetsDetailsArray',
        JSON.stringify(this.assetsDetailsArray)
      );
      console.log(this.assatsDetailsForm.value);
      this.currentStep++;
      if (this.currentStep === 8) {
        this.router.navigate(['employee/salary-details']); // Navigate to the salary Details page
      }
      // Handle other steps and navigation
    } else {
      this.assatsDetailsForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
      console.log('Form is invalid');
    }
  }

  goBack(): void {
    this.router.navigate(['employee/experience-education-details']); // Adjust the route according to your needs
  }

  cancel(): void {
    this.router.navigate(['/employee-list']); // Navigate to the employee list page
  }
}