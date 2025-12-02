import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BookService} from '../../_services/book.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  bookService = inject(BookService);
  router = inject(Router);
  toastr = inject(ToastrService);

  model = {
    name: ''
  }

  protected onSubmit(model: any) {
    if (model.valid) {
      this.bookService.addCategory(model.value).subscribe({
        next: () => {
          this.toastr.success("Category added successfully")
          this.router.navigate(['/categories'])
        },
        error: (err) => {
          this.toastr.error("Error adding category")
        }
      })
    }
  }
}
