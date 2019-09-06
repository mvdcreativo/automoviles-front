import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'j3m-nav-bars',
  templateUrl: './nav-bars.component.html',
  styleUrls: ['./nav-bars.component.scss']
})
export class NavBarsComponent implements OnInit {
  public user: User/*  = this.authService.currentUserValue(); */

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService : AuthService
    ) {}

ngOnInit(){
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getUser()

}

    getUser(){
      const dataUser = this.authService.currentUserValue;
      this.user = dataUser['user']
    }

    public getLogout(){
      this.authService.logout().subscribe(
        res => console.log(res)
        
      )
    }

}
