import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  bookService = inject(BookService);
  cartService = inject(CartService);
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  user: any;

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = this.authService.isLoggedIn();
      if(this.isLoggedIn){
        this.user = this.authService.getUserData();
        this.isAdmin = this.user.isAdmin;
      }
    });
  }

  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_data');
    this.authService.isLoggedIn$.next(false);
  }

  search(term: string) {
    this.bookService.setSearchTerm(term);
  }
}
