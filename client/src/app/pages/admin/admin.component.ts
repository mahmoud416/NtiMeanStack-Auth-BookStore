import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book, BookService } from 'src/app/services/book.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export default class AdminComponent implements OnInit {
  bookService = inject(BookService);
  books: Book[] = [];
  isListView: boolean = false;

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe((res) => {
      this.books = res.data;
    });
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.getBooks();
    });
  }
}
