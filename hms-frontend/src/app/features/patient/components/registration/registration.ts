import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedStateService } from '../../../../core/services/shared-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration implements OnInit, OnDestroy {
  isLoading = false;
  private saveSubscription: Subscription | undefined;

  registrationForm = {
    regDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    title: 'Mr.',
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    ageY: '',
    ageM: '',
    ageD: '',
    gender: 'Male',
    bloodGroup: '',
    mobile: '',
    email: '',
    address: '',
    regFee: 500,
    discount: 0,
    netAmount: 500,
    paymentMode: 'Cash'
  };

  constructor(private sharedState: SharedStateService) { }

  ngOnInit() {
    this.saveSubscription = this.sharedState.saveTriggered$.subscribe(() => {
      this.onSave();
    });
  }

  ngOnDestroy() {
    if (this.saveSubscription) {
      this.saveSubscription.unsubscribe();
    }
  }

  onSave() {
    this.isLoading = true;
    console.log('Saving Registration:', this.registrationForm);
    setTimeout(() => {
      this.isLoading = false;
      alert('Patient Registered Successfully!');
    }, 1000);
  }

  setPaymentMode(mode: string) {
    this.registrationForm.paymentMode = mode;
  }
}
