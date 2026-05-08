import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot, UrlTree
} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {StorageService} from '../services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: StorageService
  ) {}

  canActivate(): boolean | UrlTree {
    if(this.storage.isLoggedIn()){
       return true;
    }
    return this.router.parseUrl('/login');
  }
}
