import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'u-modern-angular-bc-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    if(this.authForm.invalid) return
    this.authService.signin(this.authForm.value).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigateByUrl('/inbox')
      },
      error: (err) => {
        if(err.username || err.password) {
          this.authForm.setErrors({credentials: true})
        }

      }
    })
  }

}
