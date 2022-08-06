import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import Swal from 'sweetalert2'
import { Product } from 'src/app/models/product';
import { CartServiceService } from 'src/app/services/cartService/cart-service.service';
import { ProductServiceService } from 'src/app/services/productService/product-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!: Product;

  public optionSelected: number = 1;

  public options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private router: ActivatedRoute,
    private productService: ProductServiceService,
    private cartService: CartServiceService
    ) { }

  ngOnInit(): void {

    let productId = this.router.snapshot.params['id'];

    this.productService.getProducts().pipe(map((products) => products.filter((item) => item.id === Number(productId)))).subscribe(data => {
      this.product = data[0];
    });
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
