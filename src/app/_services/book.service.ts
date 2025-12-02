import { inject, Injectable } from '@angular/core';
import { envirement } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CreateBookDto } from '../_models/create-book-dto';
import { Book } from '../_models/book';
import { CategoryDto } from '../_models/category-dto';
import { BookDto } from '../_models/book-dto';
import { EditBookDto } from '../_models/edit-book-dto';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseUrl = envirement.apiUrl;
  http = inject(HttpClient);

  addBook(model: any) {
    return this.http.post<Book>(`${this.baseUrl}books`, model);
  }

  getBook(bookId: number) {
    return this.http.get<BookDto>(`${this.baseUrl}books/${bookId}`);
  }

  getCategories() {
    return this.http.get<CategoryDto[]>(`${this.baseUrl}categories`);
  }

  addCategory(model: any){
    return this.http.post(`${this.baseUrl}categories`, model)
  }

  updateCategory(id: number,model: any){
    return  this.http.put<CategoryDto>(`${this.baseUrl}categories/${id}`, model);
  }

  getCategory(id: number){
    return this.http.get<CategoryDto>(`${this.baseUrl}categories/${id}`)
  }

  deleteCategory(id: number){
    return this.http.delete(`${this.baseUrl}categories/${id}`)
  }

  editBook(bookId: number, model: any) {
    return this.http.put<BookDto>(`${this.baseUrl}books/${bookId}`, model);
  }

  deleteBook(bookId: number) {
    return this.http.delete(`${this.baseUrl}books/${bookId}`);
  }
}
