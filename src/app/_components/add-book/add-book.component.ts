import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../_services/book.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryDto } from '../../_models/category-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  bookService = inject(BookService);
  router = inject(Router);
  addBook!: FormGroup;
  fb = inject(FormBuilder);
  categories!: CategoryDto[];
  toastr = inject(ToastrService);

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
    throw new Error('Method not implemented.');
  }
}
