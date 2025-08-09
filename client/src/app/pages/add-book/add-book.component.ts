import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  bookForm: FormGroup;
  selectedFile: File | null = null;
  message: string = '';
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      isbn13: ['', Validators.required],
      price: ['', Validators.required],
      image: [''], // optional if using url
      url: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    this.message = '';
    this.error = '';
    if (this.bookForm.valid) {
      const formData = new FormData();
      formData.append('title', this.bookForm.get('title')?.value);
      formData.append('isbn13', this.bookForm.get('isbn13')?.value);
      formData.append('price', this.bookForm.get('price')?.value);
      formData.append('url', this.bookForm.get('url')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      } else if (this.bookForm.get('image')?.value) {
        formData.append('image', this.bookForm.get('image')?.value);
      }
      this.bookService.addBook(formData).subscribe({
        next: () => {
          this.message = 'Book added successfully!';
          this.bookForm.reset();
          this.selectedFile = null;
        },
        error: (err) => {
          this.error = 'An error occurred while adding the book. Please check your data or try again.';
          console.error('Error adding book:', err);
        }
      });
    } else {
      this.error = 'يرجى ملء جميع البيانات المطلوبة.';
    }
  }
}
