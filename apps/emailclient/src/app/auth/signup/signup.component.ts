import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'u-modern-angular-bc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], [this.uniquePassword.validate]), // -> run only after all above sync validators are valid
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  }, {validators: [
    this.matchPassword.validate
  ]})

  constructor(
    private matchPassword: MatchPassword,
    private uniquePassword: UniqueUsername,
    private authService: AuthService,
    private router: Router
    ) { }



  onSubmit() {
    if (this.authForm.invalid) return
    this.authService.signup(this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox')
      },
      error: (err) => {
        if(!err.status) { // <- status=0 on offline error
          this.authForm.setErrors({ noConnection: true })
        }
      }
      }
    )
  }

}
