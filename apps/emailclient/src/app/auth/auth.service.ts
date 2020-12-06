import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean
}

interface SignupCredentials {
  username: string
  password: string
  passwordConfirmation: string
}

interface SigninCredentials {
  username: string
  password: string
}

interface SignupResponse {
  username: string
}

interface SignedinResponse {
  authenticated: boolean
  username: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com'
  signedin$ = new BehaviorSubject(false)


  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`, {
      username
    })
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials,
      //{withCredentials: true} // -> to save cookies from response header
      ).pipe(
      tap(() => {
        this.signedin$.next(true)
      })
    )
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`,
      // {withCredentials: true}
      )
      .pipe(
        tap(({authenticated}) => {
          this.signedin$.next(authenticated)
        }) // Default behavior of httpClient will discard all cookies in response header
      )
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
      .pipe(
        tap(() => this.signedin$.next(false))
      )
  }

  signin(credentials: SigninCredentials) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap(() => {
          this.signedin$.next(true)
        })
      )
  }

}
