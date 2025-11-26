import { Component, inject, OnInit } from '@angular/core';
import { LibraryService } from '../_services/library.service';
import { LoanDto } from '../_models/loan-dto';

@Component({
  selector: 'app-my-loans',
  standalone: true,
  imports: [],
  templateUrl: './my-loans.component.html',
  styleUrl: './my-loans.component.css'
})
export class MyLoansComponent implements OnInit {

  libService = inject(LibraryService);
  books!: LoanDto[];

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

}
