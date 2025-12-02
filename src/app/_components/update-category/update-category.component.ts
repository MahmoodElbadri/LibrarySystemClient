import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../_services/book.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent implements OnInit {


  id: number = 0;
  bookService = inject(BookService);
  activatedRoute = inject(ActivatedRoute)
  toastr = inject(ToastrService);
  category!: any;
  router = inject(Router);

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getCategory(this.id);
  }

  getCategory(id: number) {
    this.bookService.getCategory(id).subscribe({
      next: (response) => {
        console.log("The Category is:", response)
        this.category = response;
      },
      error: () => {
        this.toastr.error("Error fetching category")
      }
    })
  }

  onSubmit(model: any) {
    this.bookService.updateCategory(this.id, model.value).subscribe({
      next:()=>{
        console.log(model);
        this.toastr.success("Category updated successfully")
        this.router.navigate(['/categories']);
      },
      error:()=>{
        this.toastr.error("Error updating category")
      }
    });
  }

}
