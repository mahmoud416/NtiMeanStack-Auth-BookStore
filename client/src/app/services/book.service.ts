import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  getBooks(title?: string) {
    let url = 'http://localhost:8800/api/book';
    if (title && title.trim().length > 0) {
      url += `?title=${title.trim()}`;
    }
    return this.http.get<Response<Book[]>>(url);
  }

  setSearchTerm(term: string) {
    this.searchSubject.next(term);
  }

  addBook(book: FormData) {
    return this.http.post('http://localhost:8800/api/book', book);
  }

  deleteBook(id: string) {
    return this.http.delete(`http://localhost:8800/api/book/${id}`);
  }
}

export type Book = {
  _id: string;
  title: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
};

export type Response<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T
}
