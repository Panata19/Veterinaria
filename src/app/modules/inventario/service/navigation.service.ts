import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NavegationService {

  constructor() { }
  
  private _useNavigation: boolean = false;
  
  get useNavigation(): boolean {
    return this._useNavigation;
  }

  verificaNavegation(): Observable<boolean>{
    if( this._useNavigation ){
      console.log('Permitido por el Guard');
      return of(true);
    }
    console.log('Bloqueado por el Guard');
    return of(false)
  }

  isNavegation(value: boolean = false): void{
    this._useNavigation = value;
  }
  
}
