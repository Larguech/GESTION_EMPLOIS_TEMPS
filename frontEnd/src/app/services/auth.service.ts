import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
<<<<<<< HEAD
import { Observable, tap } from 'rxjs';
=======
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
>>>>>>> 9843a6c3b9623b44815aa3d3e5eaf3c038b28c12
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

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(environment.backendHost +'/auth/login', loginData);
  }

  logout(id:number): Observable<boolean> {
    // remove cookies
    this.cookieService.delete('username');
this.cookieService.delete('userId');
// Remove more cookies if needed

    return this.http.get<boolean>(environment.backendHost +'/auth/logout/'+id)
    }

<<<<<<< HEAD
=======
  getAuthToken(): string {
    return this.cookieService.get('authToken');
  }

  logout(userId: number): Observable<any> {
    // Example API call for server-side logout
    return this.http.post(environment.backendHost + '/auth/logout', { userId }).pipe(
      shareReplay(1), // Cache the response for consistent use
      // Optionally, clean up local state on logout response
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
    // Check if the user is logged in based on the presence of a token
    return !!this.cookieService.get('authToken');
  }
>>>>>>> 9843a6c3b9623b44815aa3d3e5eaf3c038b28c12
}
