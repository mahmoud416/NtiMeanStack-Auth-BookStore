import { Injectable, computed, signal } from '@angular/core';
import { Book } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<Book[]>([]);

  totalItems = computed(() => this.cartItems().length);

  totalPrice = computed(() => this.cartItems().reduce((acc, item) => acc + parseFloat(item.price.replace('$', '')), 0));

  addToCart(book: Book) {
    this.cartItems.update(items => [...items, book]);
  }

  removeFromCart(book: Book) {
    this.cartItems.update(items => items.filter(item => item._id !== book._id));
  }

  constructor() { }
}
