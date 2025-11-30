import {Component, inject, OnInit} from '@angular/core';
import {BookService} from '../../_services/book.service';
import {CategoryDto} from '../../_models/category-dto';
import {JsonPipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import { LoginService } from "../../_services/login.service";
import {RouterLink} from '@angular/router';

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
      },
      error:(err)=>{
        this.toastr.error("Error deleting category")
      }
    })
  }



  protected editCategory(id: number) {

  }
}
