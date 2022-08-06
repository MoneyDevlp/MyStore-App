import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { CartServiceService } from 'src/app/services/cartService/cart-service.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;

  public optionSelected: number = 1;

  public options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private router: Router,
    private cartService: CartServiceService
    ) { 
    this.product = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: '',
    };
  }

  ngOnInit(): void {
  }

  public redirectProductDetail() {
    this.router.navigate([`/product/${this.product.id}`]);
  }

  addProductTocart(product: Product) {
    this.cartService.addProductToCart(product, this.optionSelected);
    Swal.fire(
      'Added!',
      'Add product to cart successfully',
      'success'
    )
  }

}
