import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const trafficToken = localStorage.getItem("trafficToken");
    if (trafficToken) {
      return next.handle(request.clone({setHeaders: {authorization: `Bearer ${trafficToken}`}}));      
    } else {
      return next.handle(request);      
    }
  }
}
