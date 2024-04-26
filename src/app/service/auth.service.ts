import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { UsuarioService } from './usuario.service';

const AUTH_API = environment.url + '/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private servicio: UsuarioService) { }

  //metodos con Observable
  login(email: string, password: string): Observable<any> {
    const user = {
      email: email,
      password: password
    };
    return this.http.post(
      AUTH_API + 'login',
      user,
      httpOptions
    ).pipe(tap(res => {
      if (res && res.token) {
        console.log("login metod en auth service");

        console.log(res);
        this.servicio.changeUser(res); // Actualiza los datos del usuario

        localStorage.setItem('token', res.token);
      }
    }));
  }

  register(username: string, email: string, birthday: Date, password: string): Observable<any> {
    const user = {
      nombre: username,
      email: email,
      birthday: birthday,
      password: password
    };
    return this.http.post(
      AUTH_API + 'register',
      user
    ).pipe(tap(res => {
      console.log("register metod en auth service");
      console.log(res);
      this.servicio.changeUser(res); // Actualiza los datos del usuario
      localStorage.setItem('token', res.token);
    }));
  }

  // logout(): Observable<any> {
  //   return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  // }
}
