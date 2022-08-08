import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartServiceService } from 'src/app/services/cartService/cart-service.service';
import { ConfirmServiceService } from 'src/app/services/confirmService/confirm-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  fullName: string = '';

  address: string = '';

  creditCardNumber: string = '';

  confirmForm!: FormGroup;

  products: Product[] = [];

  isEmpty: boolean = false;

  total: number = 0;

  constructor(
    private cartService: CartServiceService,
    private router: Router,
    private confirmService: ConfirmServiceService) { }

  ngOnInit(): void {

    // this.confirmForm = this.formBuilder.group({
    //   fullname: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
    //   address: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(5)]),
    //   creditCardNumber: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(16)])
    // })

    this.confirmForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(5)]),
      creditCardNumber: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(16)])
    })

    this.getListProductCart();

    if(this.products.length > 0) {
      this.isEmpty = true;
      this.getTotal();
    }

  }

  get fullname() { return this.confirmForm.get('fullName'); }

  get addRess() { return this.confirmForm.get('address'); }

  get creditCardnumber() { return this.confirmForm.get('creditCardNumber'); }


  getListProductCart() {
    this.products = this.cartService.getListProductsCart();
  }

  getTotal() {
    this.total = this.products.reduce((quantity, productCurrent) => {
      const currTotal = productCurrent.price * parseInt(productCurrent.quantity as unknown as string);
      return quantity + currTotal;
    },0)
  }

  onChangeProductCart(event: any, product: Product) {
    this.products = this.cartService.changeProductInCart(product, event);
    this.getTotal();
  }

  deleteProduct(id: number) {
    this.cartService.deleteProductInCart(id);
    this.getListProductCart();
    this.getTotal();
    if(this.products.length === 0) {
      window.location.reload();
    }
  }

  onSubmit() {
    if(this.confirmForm.valid) {
      const info = {
        fullName: this.confirmForm.value.fullName,
        address: this.confirmForm.value.address,
        creditCardNumber: this.confirmForm.value.creditCardNumber,
        total: this.total,
      };
  
      this.confirmService.addConfirm(info);
      this.cartService.clearProductCart();
      Swal.fire(
        'Purchases',
        'Payment successfully',
        'success'
      )
      this.router.navigateByUrl('/confirmation');
    }
    else {
      Swal.fire(
        'Purchases',
        'Payment error',
        'error'
      )
    }
  }

}
