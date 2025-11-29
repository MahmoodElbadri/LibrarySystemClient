import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../_services/login.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit{

  loginService = inject(LoginService);
  role!: string;

  ngOnInit(): void {
    this.role = localStorage.getItem('role') ?? '';
  }

    logOut() {
    this.loginService.logOut();
  }
}
