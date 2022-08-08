import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import Swal from 'sweetalert2'
import { CartServiceService } from 'src/app/services/cartService/cart-service.service';
import { ProductServiceService } from 'src/app/services/productService/product-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  public optionSelected: number = 1;

  constructor(
    private productService: ProductServiceService,
    private cartService: CartServiceService,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    })
  }

  setQuantitySelected(e:any) {
    this.optionSelected = e;
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
