import { Component, OnInit } from '@angular/core';
import { Confirmation } from 'src/app/models/confirm';
import { ConfirmServiceService } from 'src/app/services/confirmService/confirm-service.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  paymentInfo: Confirmation = {
    fullName: '',
    address: '',
    creditCardNumber: '',
    total: 0,
  };

  isDisplay: boolean = true;

  constructor(
    private confirmService: ConfirmServiceService
  ) { }

  ngOnInit(): void {
    this.getPaymentInfo();

    if(this.paymentInfo.fullName === "" || this.paymentInfo.address === "") {
      this.isDisplay = false;
    }
  }

  getPaymentInfo() {
    this.paymentInfo = this.confirmService.getPaymentInfo();
  }

}
