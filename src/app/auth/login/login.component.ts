import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Component({
  selector: 'j3m-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public form: FormGroup;
  public submitted = false;
  public error = '';
  public returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService : AuthService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'admin'; 
    // reset login status
    this.reLogout();

  }

  reLogout(){
    const currentUser = localStorage.getItem('currentUser');
    if(currentUser){
      this.authService.logout().subscribe(
        res => console.log(res)
      );      
    }

  }

  onSubmit(){
    this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    // console.log(this.form.value)
     this.authService.login(this.form.value)
      .pipe(first())
      .subscribe(
          data => {
              // console.log(data);
              
              this.router.navigate([this.returnUrl]);
          },
          error => {
              this.error = error;
              // this.loading = false;
          });
       
  }
  
}
