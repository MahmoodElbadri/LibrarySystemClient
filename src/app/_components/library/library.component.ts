import {Component, inject, OnInit} from '@angular/core';
import {LibraryService} from '../../_services/library.service';
import {Book} from '../../_models/book';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CategoryDto} from '../../_models/category-dto';
import {BookService} from '../../_services/book.service';
import {LoginService} from '../../_services/login.service';
import {ToastrService} from 'ngx-toastr';
import {Pagination} from '../../_models/Pagination';
import {BookDto} from '../../_models/book-dto';
import {PaginationModule} from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [FormsModule, RouterLink, PaginationModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent implements OnInit {
  libService = inject(LibraryService);
  books: BookDto[] = [];
  cats!: CategoryDto[];
  searchTerm!: string;
  categoryId!: number;
  bookService = inject(BookService);
  loginService = inject(LoginService);
  role!: string;
  toastr = inject(ToastrService);
  queryParams!: any;
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  pagination!: Pagination | undefined;
  pageNumber = 1;
  pageSize = 5;


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.categoryId = params['categoryId'];
      // this.searchTerm = params['searchTerm'];
    })
    this.getBooks();
    this.getCats();
    const email = this.loginService.currentEmail();
    if (email) {
      this.loginService.getUserRole(email).subscribe({
        next: (role) => {
          this.role = role;
        }
      });
    }
  }

  getCats() {
    this.bookService.getCategories().subscribe({
      next: (categories) => {
        this.cats = categories;
      },
    });
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.getBooks();
    }
  }

  resetFilters() {
    this.searchTerm = '';
    this.categoryId = 0;
    this.pageNumber = 1;
    this.pageSize = 5;
    this.getBooks();
  }

  getBooks() {
    this.libService.getBooks(this.searchTerm, this.categoryId, this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.books = response.result || [];
        this.pagination = response.pagination;
      },
      error: (error) => {
        console.log(error);
        this.books = [];
      },
    });
  }

  borrowBook(bookId: number) {
    this.libService.borrowBook(bookId).subscribe({
      next: (books) => {
        this.router.navigate(['/']);
        this.toastr.success('Book borrowed successfully.');
        const book = this.books.find((tmp) => tmp.id === bookId);
        if (book && book?.quantity > 1) {
          book.quantity--;
          book.isAvailable = true;
        }
        else if (book && book?.quantity === 1) {
          book.quantity--;
          book.isAvailable = false;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteBook(arg0: number) {
    this.bookService.deleteBook(arg0).subscribe({
      next: () => {
        this.getBooks();
        this.toastr.success('Book deleted successfully.');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
