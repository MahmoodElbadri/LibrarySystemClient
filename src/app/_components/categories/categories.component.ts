import {Component, inject, OnInit} from '@angular/core';
import {BookService} from '../../_services/book.service';
import {CategoryDto} from '../../_models/category-dto';
import {JsonPipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import { LoginService } from "../../_services/login.service";
import {Router, RouterLink} from '@angular/router';
import {envirement} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    JsonPipe,
    RouterLink
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {


  bookService = inject(BookService);
  toastr = inject(ToastrService);
  cats !: CategoryDto[];
  role!: any;
  loginService = inject(LoginService);
  router = inject(Router);
  baseUrl = envirement.apiUrl;
  http = inject(HttpClient);


  ngOnInit(): void {
    this.getCats();
    this.role = this.loginService.getUserRole(this.loginService.currentEmail()!).subscribe((role) => (this.role = role));
  }



  getCats(){
    this.bookService.getCategories().subscribe({
      next:(cats)=>{
        this.cats = cats;
      },
      error:(err)=>{
        this.toastr.error("Error fetching categories")
      }
    })
  }

  protected deleteCategory(id: number) {
    // alert(`Delete button clicked for id:${id}`)
    this.bookService.deleteCategory(id).subscribe({
      next:()=>{
        this.toastr.success("Category deleted successfully")
        this.router.navigate(['/categories'])
        this.cats = this.cats.filter(tmp=>tmp.id !== id);
      },
      error:(err)=>{
        this.toastr.error("Error deleting category")
      }
    })
  }

  protected getBooksByCategory(id: number) {
   const queryParams = {
      categoryId: id
    }
  this.router.navigate(['/'], {queryParams});
  }
}
