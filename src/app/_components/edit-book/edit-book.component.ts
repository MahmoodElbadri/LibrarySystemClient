import {Component, inject, OnInit} from '@angular/core';
import {BookService} from '../../_services/book.service';
import {BookDto} from "../../_models/book-dto";
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {EditBookDto} from '../../_models/edit-book-dto';
import {CategoryDto} from '../../_models/category-dto';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  bookService = inject(BookService);
  book!: BookDto;
  editBookDto!: EditBookDto;
  categories!: CategoryDto[];
  id!: number;
  activatedRoute = inject(ActivatedRoute);
  bookEdit!: FormGroup;
  fb = inject(FormBuilder);

  settingEditForm(){
    this.bookEdit = this.fb.group({
      title: [this.book.title],
      author: [this.book.author],
      description: [this.book.description],
      categoryId: [this.book.categoryName]
    })
  }

  /**
   *     title: string;
   *     author: string;
   *     description: string;
   *     categoryId: number;*/

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getBook(this.id);
    this.settingEditForm();
    //بص علي Copilot
    this.getCategories();
  }

  getBook(id: number) {
    this.bookService.getBook(id).subscribe({
      next: (book) => {
        console.log("The book is", book)
        this.book = book;
      }
    })
  }

  getCategories(){
    this.bookService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    })
  }

}
