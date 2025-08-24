import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find((u: any) => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  register(user: any): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.find((u: any) => u.email === user.email)),
      switchMap(existingUser => {
        if (existingUser) {
          return throwError(() => new Error('User already exists!'));
        }
        return this.http.post(this.apiUrl, user);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}
