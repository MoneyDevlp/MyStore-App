import { Injectable } from '@angular/core';
import { Confirmation } from 'src/app/models/confirm';

@Injectable({
  providedIn: 'root'
})
export class ConfirmServiceService {

  confirmForrm: Confirmation = {
    fullName: '',
    address: '',
    creditCardNumber: '',
    total: 0,
  };

  constructor() { }

  getPaymentInfo() {
    return this.confirmForrm;
  }

  addConfirm(info: Confirmation) {
    this.confirmForrm = info;
    return this.confirmForrm;
  }
}
