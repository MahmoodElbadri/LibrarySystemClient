import { inject, Injectable } from '@angular/core';
import { envirement } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Book } from '../_models/book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  baseUrl = envirement.apiUrl;
  http = inject(HttpClient);

  getBooks(){
    return this.http.get<Book[]>(`${this.baseUrl}books`);
  }

  //https://localhost:7077/api/Loans/borrow
  //https://localhost:7077/api/Loans/borrow
  borrowBook(bookId: number){
    return this.http.post(`${this.baseUrl}Loans/borrow`,{bookId});
  }
}
