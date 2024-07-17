import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.scss']
})
export class LoginOtpComponent implements OnInit, OnDestroy {
  verificationForm!: FormGroup;
  timer: number = 180; // 3 minutes in seconds
  timerDisplay: string = '03:00';
  timerRunning: boolean = false;
  resendDisabled: boolean = true;

  @ViewChild('code2Input') code2Input!: ElementRef;
  @ViewChild('code3Input') code3Input!: ElementRef;
  @ViewChild('code4Input') code4Input!: ElementRef;
  hideButton!: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.startTimer();
    this.verificationForm = this.fb.group({
      code1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      code2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      code3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      code4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
    });
  }

  onlyNumberKey(event: KeyboardEvent): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Backspace') {
      const input = event.target as HTMLInputElement;
      if (input.value === '') {
        const prevInput = input.previousElementSibling as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  }

  moveFocus(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.value !== '') {
      switch (controlName) {
        case 'code2':
          this.code2Input.nativeElement.focus();
          break;
        case 'code3':
          this.code3Input.nativeElement.focus();
          break;
        case 'code4':
          this.code4Input.nativeElement.focus();
          break;
        default:
          break;
      }
    }
  }

  startTimer() {
    this.timerRunning = true;
    const interval = setInterval(() => {
      this.timer--;
      this.timerDisplay = this.formatTime(this.timer);

      if (this.timer <= 0) {
        clearInterval(interval);
        this.timerRunning = false;
        this.resendDisabled = false; // Enable resend OTP link
        this.hideButton = false;
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const minutesDisplay = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsDisplay = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  resendOTP() {
    // Implement your resend OTP logic here
    // Reset timer and disable resend link again if needed
    this.timer = 180;
    this.timerDisplay = '03:00';
    this.resendDisabled = true;
    this.startTimer();
    this.hideButton = true;
  }

  ngOnDestroy(): void {
  }

  

  onSubmit(): void {
    if (this.verificationForm.valid) {
      this.router.navigate(['/employee-list']);
      // Handle further actions here, e.g., API calls
    }
  }
}
