import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';

// const API_URL = environment.url + '/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  private userSource = new BehaviorSubject(
    JSON.parse(localStorage.getItem('currentUser')) || null
  );
  currentUser = this.userSource.asObservable();

  changeUser(user: any) {
    this.userSource.next(user);
    // Almacenar el usuario actual en el localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Método para actualizar un usuario
  updateUserPlan(userId: number, userPlan: any): Promise<boolean> {
    const url = environment.url+`/update-user-plan/${userId}`;

    return this.http.put(url, userPlan)
      .toPromise()
      .then((response) => {
        // Maneja la respuesta de la actualización aquí
        console.log("Plan usuario actualizado con éxito");
        return true;
      })
      .catch((error) => {
        // Maneja el error en caso de que la actualización falle
        console.error("Error al actualizar plan el usuario", error);
        return false;
      });
  }

  getPlanID(userId: number): Promise<number> {
    const url = environment.url+`/api/user/usuarios/${userId}`;

    return this.http.get(url)
      .toPromise()
      .then((response: any) => {
        return response.plan.id;
      })
      .catch((error) => {
        return 0;
      });
  }

  pagarMes(){
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en el almacenamiento local.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': token
    });

    this.currentUser.subscribe(user => {
      this.http.post(environment.url+'/api/pago/realizarPago', user, { headers }).subscribe(
        response => {
          console.log('Pago realizado con éxito', response);
          console.log(response);
          window.alert("Pago Realizado con éxito");
        },
        error => {
          console.error('Error al realizar el pago', error);
        }
      );
    })

    
  }
}
