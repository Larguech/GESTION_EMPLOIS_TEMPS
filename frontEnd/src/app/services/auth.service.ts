import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn: boolean = false;
  public isAdmin: boolean = false;
  public isProf: boolean = false;
  public name: string = '';
  public token: string = '';
  public id: number = 0;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(login: string, password: string): Observable<any> {
    const body = { login, password };
    return this.http.post<any>(environment.backendHost + '/auth/login', body, { withCredentials: true })
  }

  saveAuthData(token: string, userData: any): void {
    this.token = token;
    this.loggedIn = true;
    this.isAdmin = userData.admin;
    this.isProf = userData.enseignant;
    this.name = `${userData.nom} ${userData.prenom}`;
    this.id = userData.id;
    
    // Store authentication data in cookies
    this.cookieService.set('authToken', token);
    this.cookieService.set('username', this.name);
    this.cookieService.set('userId', String(this.id));
    this.cookieService.set('role', userData.admin ? 'Administrateur' : 'Enseignant');
  }

  getAuthToken(): string {
    return this.cookieService.get('authToken');
  }

  logout(userId: number): Observable<any> {
    return this.http.post(environment.backendHost + '/auth/logout', { userId }).pipe(
      shareReplay(1),
      tap(() => {
        this.cookieService.deleteAll();
        this.loggedIn = false;
        this.token = '';
        this.id = 0;
        this.name = '';
        this.isAdmin = false;
        this.isProf = false;
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return token !== null && token !== '';
  }
}
