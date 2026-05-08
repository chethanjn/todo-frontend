import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {AuthRequest, AuthResponse} from '../../models/auth.model';
import {Observable, tap} from 'rxjs';
import {StorageService} from './storage.service';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly baseUrl: string = `${environment.apiUrl}/auth/`;
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
  ) {}

  login(payload: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseUrl}` + 'login', payload).pipe(
      tap((response: AuthResponse) => {
        this.storage.setToken(response.token);
        this.storage.getUserName();
      })
    )
  }

  logout(){
    this.storage.clearAll();
    this.router.navigate(['/login']);
  }
}
