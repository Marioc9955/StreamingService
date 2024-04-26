import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private componentActiveSource = new BehaviorSubject<string>(
    localStorage.getItem('componentActive') || 'none'
  );
  private contenidoAMostrarSource = new BehaviorSubject<string>(
    localStorage.getItem('contenidoAMostrar') || 'none'
  );
  private isPlanAvSource = new BehaviorSubject<boolean>(
    localStorage.getItem('isPlanAv') === 'true' || false
  );
  private edadUserSource = new BehaviorSubject<number>(
    parseInt(localStorage.getItem('edadUser')) || 0
  );
  private isAdminSource = new BehaviorSubject<boolean>(
    localStorage.getItem('isAdmin') === 'true' || false
  );
  private adminLoggedSource = new BehaviorSubject<boolean>(
    localStorage.getItem('adminLogged') === 'true' || false
  );
  private adminContentSource = new BehaviorSubject<string>(
    localStorage.getItem('adminContent') || 'none'
  );

  componentActive$ = this.componentActiveSource.asObservable();
  isPlanAv$ = this.isPlanAvSource.asObservable();
  contenidoAMostrar$ = this.contenidoAMostrarSource.asObservable();
  edadUser$ = this.edadUserSource.asObservable();
  isAdmin$ = this.isAdminSource.asObservable();
  adminLogged$ = this.adminLoggedSource.asObservable();
  adminContent$ = this.adminContentSource.asObservable();

  constructor() {
    // Almacenar los valores iniciales en el localStorage
    this.componentActive$.subscribe(value => localStorage.setItem('componentActive', value)); 
    this.isPlanAv$.subscribe(value => localStorage.setItem('isPlanAv', value.toString()));
    this.contenidoAMostrar$.subscribe(value => localStorage.setItem('contenidoAMostrar', value));
    this.edadUser$.subscribe(value => localStorage.setItem('edadUser', value.toString()));
    this.isAdmin$.subscribe(value => localStorage.setItem('isAdmin', value.toString()));
    this.adminLogged$.subscribe(value => localStorage.setItem('adminLogged', value.toString()));
    this.adminContent$.subscribe(val => localStorage.setItem('adminContent', val.toString()));
  }

  changeComponentActive(value: string) {
    this.componentActiveSource.next(value);
  }

  changeIsPlanAv(value: boolean) {
    this.isPlanAvSource.next(value);
  }

  changeContenidoAMostrar(value:string){
    this.contenidoAMostrarSource.next(value);
  }

  changeEdadUser(val:number){
    this.edadUserSource.next(val);
  }

  changeIsAdmin(value: boolean) {
    this.isAdminSource.next(value);
  }

  changeAdminLogged(value: boolean) {
    this.adminLoggedSource.next(value);
  }

  changeAdminContent(val:string){
    this.adminContentSource.next(val);
  }
}
