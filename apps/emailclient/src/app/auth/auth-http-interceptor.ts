import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AuthHttpInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Modify the outgoing request
    const modifiedReq = req.clone({
      withCredentials: true
    })

    return next.handle(modifiedReq)
      .pipe(
        tap(val => {
          if(val.type === HttpEventType.Sent) {
            console.log('Request was sent to server')
          }
          if(val.type === HttpEventType.Response) {
            console.log('Got a response from the API', val)
          }
        })
      )
  }

}
