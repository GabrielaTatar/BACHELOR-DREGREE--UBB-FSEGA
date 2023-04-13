import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

// intercept primeste obiectul HttpRequest, il schimba si inainteaza la metoda handle() a obiectului HttpHandler
// transforma obiectul HttpRequest intr-un Observable
// next:HttpHandler object reprezinta urmatorul intreceptor din lantul de interceptori
// ultimul 'next' din lant este Angular HttpClient

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    });

    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
