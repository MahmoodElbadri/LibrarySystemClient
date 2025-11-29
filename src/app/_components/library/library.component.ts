import { Component, inject, OnInit } from '@angular/core';
import { LibraryService } from '../../_services/library.service';
import { Book } from '../../_models/book';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterModule} from '@angular/router';
import { CategoryDto } from '../../_models/category-dto';
import { BookService } from '../../_services/book.service';
import { LoginService } from '../../_services/login.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit {



  libService = inject(LibraryService);
  books: Book[] = [];
  cats!: CategoryDto[];
  searchTerm!: string;
  categoryId!: number;
  bookService = inject(BookService);
  loginService = inject(LoginService);
  role!: string;


  ngOnInit(): void {
    this.getBooks();
    this.getCats();
    if(this.loginService.getUserRole(this.loginService.currentEmail()!).subscribe(role => this.role = role)){
    if (this.role) {
      this.role = this.role;
    }
  }
  }

  getCats(){
    this.bookService.getCategories().subscribe({
      next: (categories) => {
       this.cats = categories;
      }
    })
  }

resetFilters() {
  this.searchTerm = '';
  this.categoryId = 0;
  this.getBooks();
}

  getBooks() {
    this.libService.getBooks(this.searchTerm, this.categoryId).subscribe({
      next: (books) => {
        this.books = books;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  borrowBook(bookId: number) {
    this.libService.borrowBook(bookId).subscribe({
      next: (books) => {
        const book = this.books.find(tmp=>tmp.id===bookId);
        if(book){
          book.isAvailable = false;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
