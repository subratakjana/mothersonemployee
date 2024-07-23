import { Component } from '@angular/core';

@Component({
  selector: 'app-bank-pf-esi',
  templateUrl: './bank-pf-esi.component.html',
  styleUrl: './bank-pf-esi.component.scss'
})
export class BankPfEsiComponent {
  previewUrl: string | ArrayBuffer | null = null;

  steps: string[] = [
    'General Details', 
    'Personal Details', 
    'Bank/PF/ESI', 
    'Contact & Address', 
    'Family Details', 
    'Experience & Education', 
    'Assets & Docs', 
    'Salary', 
    'Confirmation'
  ];
  currentStep: number = 0;

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
