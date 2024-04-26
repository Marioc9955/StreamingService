import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

   // Método para guardar un perfil
   crearPerfil(perfilData: any): Promise<any> {
    const perfil = {
      nombre: perfilData.nombre,
      usuario: perfilData.usuario
    };
    console.log(perfilData.usuario);
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(environment.url+'/api/perfil/perfiles', perfil, { headers })
      .toPromise()
      .then((response: any) => {
        // Maneja la respuesta del servidor, que debería ser el perfil creado
        const nuevoPerfil = response;
        return nuevoPerfil;
      })
      .catch((error) => {
        // Maneja el error en caso de que la creación del perfil falle
        console.error("Error al crear el perfil", error);
        throw error;
      });
  }

  // Método para eliminar un perfil por su ID
  eliminarPerfil(perfilId: number): Promise<any> {
    const url = environment.url+`/api/perfil/perfiles/${perfilId}`;

    return this.http.delete(url)
      .toPromise()
      .then((response: any) => {
        // Maneja la respuesta del servidor, que debería ser un mensaje de confirmación
        const mensaje = response.data;
        return mensaje;
      })
      .catch((error) => {
        // Maneja el error en caso de que la eliminación del perfil falle
        console.error('Error al eliminar el perfil', error);
        throw error;
      });
  }
}
