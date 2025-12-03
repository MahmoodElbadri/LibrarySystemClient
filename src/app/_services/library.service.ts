import {inject, Injectable} from '@angular/core';
import {envirement} from '../../environments/environment.development';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Book} from '../_models/book';
import {LoanDto} from '../_models/loan-dto';
import {map} from 'rxjs';
import {PaginatedResult} from '../_models/Pagination';
import {BookDto} from '../_models/book-dto';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  baseUrl = envirement.apiUrl;
  http = inject(HttpClient);

  getBooks(searchTerm?: string, categoryId?: number, page?: number, itemsPerPage?: number) {

    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (searchTerm) params = params.append('searchTerm', searchTerm);
    if (categoryId) params = params.append('categoryId', categoryId.toString());

    return this.http.get<Book[]>(`${this.baseUrl}books`, {
      observe: 'response',
      params
    }).pipe(
      map(response => {
        const paginatedResult = new PaginatedResult<Book[]>();

        if (response.body) {
          paginatedResult.result = response.body;
        }

        const paginationHeader = response.headers.get('x-pagination');
        if (paginationHeader) {
          paginatedResult.pagination = JSON.parse(paginationHeader);
        }

        return paginatedResult;
      })
    );
  }

  //https://localhost:7077/api/Loans/borrow
  //https://localhost:7077/api/Loans/borrow
  borrowBook(bookId: number) {
    return this.http.post(`${this.baseUrl}Loans/borrow`, {bookId});
  }

  getMyLoans() {
    return this.http.get<LoanDto[]>(`${this.baseUrl}Loans/my-loans`);
  }

  returnBook(bookId: number) {
    return this.http.post<LoanDto[]>(`${this.baseUrl}Loans/return`, {bookId});
  }
}
