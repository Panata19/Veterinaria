import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { NavegationService } from '../service/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class NavegationGuard implements CanActivate, CanActivateChild, CanLoad {
  routed = inject(Router);
  authService = inject(NavegationService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.verificaNavegation()
        .pipe(
          tap( (item) => {
                if(!item){
                  this.routed.navigate(['./error']);
                }
                return item;
              }
          )
        )
    
  }
}
