import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'u-modern-angular-bc-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.authService.signout().subscribe(
      () => this.router.navigateByUrl('/')
    )
  }

}
