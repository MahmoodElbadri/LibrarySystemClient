import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../_services/book.service';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CategoryDto } from '../../_models/category-dto';
import { ToastrService } from 'ngx-toastr';
import { CreateBookDto } from '../../_models/create-book-dto';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class AddBookComponent implements OnInit {
  bookService = inject(BookService);
  router = inject(Router);
  addBook!: FormGroup;
  fb = inject(FormBuilder);
  categories!: CategoryDto[];
  toastr = inject(ToastrService);
  selectedImg: File | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImg = file;
    }
  }

  ngOnInit() {
    this.createForm();
    this.getCategories();
  }

  createForm() {
    this.addBook = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      coverImage: ['', [Validators.required]],
    });
  }

  getCategories() {
    this.bookService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        this.toastr.error('An error occurred while fetching categories.');
      },
    });
  }

  createBook(model: any) {
    const formdata = new FormData();
    formdata.append('title', model.title);
    formdata.append('author', model.author);
    formdata.append('description', model.description);
    formdata.append('categoryId', model.category);
    if (this.selectedImg) {
      formdata.append('coverImage', this.selectedImg);
    } else {
        this.toastr.warning('Please select a cover image.');
        return; 
    }

    this.bookService.addBook(formdata).subscribe({
      next: () => {
        this.toastr.success('Book added successfully.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Backend Rejected:', err.error);
        this.toastr.error(err.error?.title || 'Failed to add book');
      },
    });
  }
}
