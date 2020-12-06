import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {

  constructor(private authService: AuthService) {

  }
  // ! Using Arrow Function
  validate = (control: FormControl): Promise<ValidationErrors> | Observable<ValidationErrors> => {
    const {value} = control

    return this.authService.usernameAvailable(value).pipe(
      map(() => null),
      catchError((err) => {
        console.log(err)

        if(err.error.username) {
          return of({nonUniqueUsername: true})
        } else {
          return of({noConnection: true})
        }

      })
    )
  }

}
