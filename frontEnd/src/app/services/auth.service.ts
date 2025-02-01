import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: boolean = false;
  public isAdmin: boolean = false;
  public isProf: boolean = false;
  public name: string = "";
  public token: string = "";
  public id: number = 0;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  
  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    console.log(username);
    
    return this.http.post<any>(environment.backendHost + '/auth/login', loginData, {
      withCredentials: true,
    }).pipe(
      tap((response) => {
        if (response.token) {
          this.token = response.token;
          this.name = response.nom;  
          this.id = response.id;
          this.isAdmin = response.isAdmin;
          this.isProf = response.isProf;
          this.loggedIn = true;

          this.cookieService.set('auth_token', this.token, { expires: new Date(Date.now() + 3600 * 1000) });
          this.cookieService.set('user_id', this.id.toString(), { expires: new Date(Date.now() + 3600 * 1000) });
        }
      })
    );
  }

  logout(id: number): Observable<boolean> {
    this.cookieService.delete('auth_token');
    this.cookieService.delete('user_id');
    this.cookieService.delete('username');

    return this.http.get<boolean>(environment.backendHost + '/auth/logout/' + id).pipe(
      tap(() => {
        this.loggedIn = false;
        this.isAdmin = false;
        this.isProf = false;
        this.name = '';
        this.token = '';
        this.id = 0;
      })
    );
  }

  isUserLoggedIn(): boolean {
    return this.loggedIn;
  }

  getAuthToken(): string {
    return this.cookieService.get('auth_token');
  }
}
