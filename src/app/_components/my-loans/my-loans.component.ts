import { Component, inject, OnInit } from '@angular/core';
import { LibraryService } from '../../_services/library.service';
import { LoanDto } from '../../_models/loan-dto';
import {DatePipe} from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-loans',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './my-loans.component.html',
  styleUrl: './my-loans.component.css'
})
export class MyLoansComponent implements OnInit {

  libService = inject(LibraryService);
  books!: LoanDto[];
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getMyLoans();
  }

  getMyLoans() {
    return this.libService.getMyLoans().subscribe({
      next: (books) => {
        console.log(JSON.stringify(books));
        this.books = books;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  returnBook(id: number) {
    this.libService.returnBook(id).subscribe({
      next: () => {
       this. books = this.books.filter(book => book.bookId !== id);
        this.toastr.success('Book returned successfully.');
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

}
