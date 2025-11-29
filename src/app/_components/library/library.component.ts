import { Component, inject, OnInit } from '@angular/core';
import { LibraryService } from '../../_services/library.service';
import { Book } from '../../_models/book';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit {


  libService = inject(LibraryService);
  books!: Book[];


  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.libService.getBooks().subscribe({
      next: (books) => {
        // console.log(JSON.stringify(books));
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
