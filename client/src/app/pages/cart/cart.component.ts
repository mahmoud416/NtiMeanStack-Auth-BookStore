import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export default class CartComponent {
  cartService = inject(CartService);

  removeFromCart(book: any) {
    this.cartService.removeFromCart(book);
  }
}
