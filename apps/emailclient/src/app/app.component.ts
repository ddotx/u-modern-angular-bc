import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'u-modern-angular-bc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'Email Client'
  // signedin = false
  signedin$: BehaviorSubject<boolean>

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$
  }

  ngOnInit() {
    /*this.authService.signedin$.subscribe(
      signedin => {
        this.signedin = signedin
      }
    )*/
    this.authService.checkAuth().subscribe()
  }
}
