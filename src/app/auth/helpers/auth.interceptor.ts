import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestUrl: Array<any> = req.url.split('/');
        const apiUrl: Array<any> = environment.urlApi.split('/');
        
        let loginUrl = `${environment.urlApi}auth/login`;
        let registerUrl = `${environment.urlApi}auth/signup`;
        // console.log(loginUrl);
        // console.log(req.url);
        
        
        if(requestUrl[2] === apiUrl[2] 
            && req.url !== loginUrl
            && req.url !== registerUrl){
            const currentUser = localStorage.getItem('currentUser');
            const token = JSON.parse(currentUser).token;
            // console.log(token);
            if(token){
                const headers = req.headers
                    .set('Authorization', `Bearer ${token}`);
                const authReq = req.clone({ headers });
                return next.handle(authReq);
            }else{
                return next.handle(req);
            }
        }else{
            return next.handle(req);
        }
    }
}