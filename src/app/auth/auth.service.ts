import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { map, tap, take } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private router : Router,
    private http : HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(credentials : User): Observable<User>{    
    return this.http.post<User>(`${environment.urlApi}auth/signup`, credentials)
      .pipe(
        map(user => {
            console.log(user);
            
            this.router.navigate(['login'])
            // console.log(user);

          

          return user;
        }),
      );
  }



  login(credentials : User): Observable<User>{
    return this.http.post<User>(`${environment.urlApi}auth/login`, credentials)
    .pipe(
      map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details ands token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user))
              this.currentUserSubject.next(user)
              this.router.navigate(['admin'])
              // console.log(user);
              
          }

          return user;
      }),
    );
  }

  logout() {

    return this.http.get<any>(`${environment.urlApi}auth/logout`)
    .pipe(
      map( res =>{
        console.log(res);
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null); 
        this.router.navigate(['login']);
      }),
    )

  }

}
