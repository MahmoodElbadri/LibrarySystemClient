import { inject, Injectable } from '@angular/core';
import { envirement } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CreateBookDto } from '../_models/create-book-dto';
import { Book } from '../_models/book';
import { CategoryDto } from '../_models/category-dto';

@Injectable({
  providedIn: 'root'
})
export class BookService {

 baseUrl = envirement.apiUrl;
 http = inject(HttpClient);

 addBook(model: CreateBookDto) {
  return this.http.post<Book[]>(`${this.baseUrl}books`, model);
 }

 getCategories(){
  return this.http.get<CategoryDto[]>(`${this.baseUrl}categories`);
 }

}
