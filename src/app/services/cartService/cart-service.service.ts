import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  public productCart: Product[] = [];

  constructor(private http: HttpClient) { }

  getListProductsCart() {
    return this.productCart;
  }

  addProductToCart(product: Product, quantity: number) {
    const checkProductExist = this.productCart.filter(p => p.id === product.id);

    if(checkProductExist.length !== 0) { 
      const quantityAfterAdd = 
        parseInt(checkProductExist[0]['quantity'] as unknown as string) +  parseInt(quantity as unknown as string);
      checkProductExist[0]['quantity'] = quantityAfterAdd;
      return this.productCart;    
    }
    else {
      product['quantity'] = parseInt(quantity as unknown as string);
      this.productCart.push(product);
      return this.productCart;
    }
  }

  deleteProductInCart(id: number) {
    this.productCart = this.productCart.filter(p => p.id !== id);
    return this.productCart;
  }

  changeProductInCart(product: Product, quantity: number) {
    if(quantity <= 0) {
      const deleted = this.deleteProductInCart(product.id);
      Swal.fire(
        'Deleted!',
        'Product has been deleted from cart',
        'success'
      )
      return deleted;
    }
    else {
      this.productCart = this.productCart.map((prod) => {
        if(prod.id === product.id) {
          prod['quantity'] = parseInt(quantity as unknown as string);
        }
        return prod;
      })
      return this.productCart;
    }

  }

  clearProductCart() {
    this.productCart = [];
    return this.productCart;
  }


}
