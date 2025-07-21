import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './paymentpage.component.html',
  styleUrls: ['./paymentpage.component.css']
})
export class PaymentpageComponent {
  paymentForm: FormGroup;
  selectedMethod: string = 'card';
  amount: number = 999;
 
  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      cardholderName: [''],
      cardNumber: [''],
      expiryDate: [''],
      cvv: [''],
      upiApp: [''],
      walletApp: [''],
      bankName: [''],
      termsAccepted: [false, Validators.requiredTrue]
    });
 
    this.updateValidators();
  }
 
  selectMethod(method: string): void {
    this.selectedMethod = method;
    this.updateValidators();
  }
 
  updateValidators(): void {
    const cardFields = ['cardholderName', 'cardNumber', 'expiryDate', 'cvv'];
    const upiField = 'upiApp';
    const walletField = 'walletApp';
    const bankField = 'bankName';
 
    cardFields.forEach(field => {
      const control = this.paymentForm.get(field);
      if (this.selectedMethod === 'card') {
        control?.setValidators(Validators.required);
      } else {
        control?.clearValidators();
      }
      control?.updateValueAndValidity();
    });
 
    const upiControl = this.paymentForm.get(upiField);
    if (this.selectedMethod === 'upi') {
      upiControl?.setValidators(Validators.required);
    } else {
      upiControl?.clearValidators();
    }
    upiControl?.updateValueAndValidity();
 
    const walletControl = this.paymentForm.get(walletField);
    if (this.selectedMethod === 'wallets') {
      walletControl?.setValidators(Validators.required);
    } else {
      walletControl?.clearValidators();
    }
    walletControl?.updateValueAndValidity();
 
    const bankControl = this.paymentForm.get(bankField);
    if (this.selectedMethod === 'netbanking') {
      bankControl?.setValidators(Validators.required);
    } else {
      bankControl?.clearValidators();
    }
    bankControl?.updateValueAndValidity();
  }
 
  isFieldInvalid(field: string): boolean {
    const control = this.paymentForm.get(field);
    return control?.touched && control.invalid || false;
  }
 
  submitPayment(): void {
    if (this.paymentForm.valid) {
      console.log('Payment submitted:', {
        ...this.paymentForm.value,
        method: this.selectedMethod
      });
    }
  }
}