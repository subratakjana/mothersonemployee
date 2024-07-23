import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [BsModalService]
})
export class LoginComponent implements OnInit {

  modalRef?: BsModalRef;
  captchaText: string = '';
  show: boolean | undefined;
  loginForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      unit: ['', [Validators.required]],
      rememberMe: [false],
      captcha: ['', [Validators.required]]
    });
  }

  togglePassword() {
    this.show = !this.show;
  }

  ngOnInit(): void {
    this.generateCaptcha();
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  generateCaptcha(): void {
    const chars = '0123456789';
    const captchaLength = 5;
    let captcha = '';
    for (let i = 0; i < captchaLength; i++) {
      const index = Math.floor(Math.random() * chars.length);
      captcha += chars[index];
    }
    this.captchaText = captcha;
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('captcha', this.captchaText);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.router.navigate(['/login-otp']);
    } else {
      console.log('Form is not valid');
    }
  }
}
