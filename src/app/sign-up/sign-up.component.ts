import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ac-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  signup(form: NgForm): void {
    const { email, password } = form.value;

    this.authService
      .create(email, password)
      .then(() => this.router.navigateByUrl('/users/new'));
  }
}
