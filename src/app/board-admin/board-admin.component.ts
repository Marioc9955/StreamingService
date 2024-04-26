import { Component } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent {

  contenidoAMostrar: string

  peliculas: any[] = [];
  series: any[] = [];
  usuarios: any[] = [];

  constructor(private sharedService: SharedService, private http: HttpClient) { }

  ngOnInit() {
    this.sharedService.adminContent$.subscribe(c => {
      
      switch (c) {
        case 'Usuarios':
          this.obtenerUsuarios();
          break;
        case 'Peliculas':
          this.obtenerPeliculas();
          break;
        case 'Series':
          this.obtenerSeries();
          break;
      }
      this.contenidoAMostrar = c
    })
  }

  printUsuarios() {
    // Para imprimir los objetos del array en la consola
    for (let i = 0; i < this.usuarios.length; i++) {
      console.log(this.usuarios[i]);
    }
  }

  obtenerUsuarios() {
    this.http.get(environment.url + '/api/user/usuarios').subscribe(
      (response: any) => {
        // Maneja la respuesta del servidor, que debería ser la lista de usuarios
        console.log(response);
        this.usuarios = response;
      },
      (error) => {
        // Maneja el error en caso de que la obtención falle
        console.error("Error al obtener usuarios", error);
      }
    );
  }

    // Obtener películas para mayores de 18
    obtenerPeliculas() {
      console.log("Obteniendo pelis de terror");
      this.http.get(environment.url + '/api/pelicula/peliculasH').subscribe(
        (response: any) => {
          console.log("se obtenieron?")
          console.log(response);
          // Maneja la respuesta del servidor, que debería ser la lista de películas
          this.peliculas = response;
        },
        (error) => {
          // Maneja el error en caso de que la obtención de películas falle
          console.error("Error al obtener las películas", error);
        });
    }
  
    // Obtener series
    obtenerSeries() {
      this.http.get(environment.url + '/api/serie/listar').subscribe(
        (response: any) => {
          // Maneja la respuesta del servidor, que debería ser la lista de series
          this.series = response;
        },
        (error) => {
          // Maneja el error en caso de que la obtención de series falle
          console.error("Error al obtener las series", error);
        });
    }

    editarUsuario(usuario: any) {
      // Implementa la lógica para editar el usuario, por ejemplo, navegando a una página de edición.
      // Puedes usar el usuario.id para identificar al usuario que deseas editar.
    }
  
    eliminarUsuario(usuarioId: number) {
      // Implementa la lógica para eliminar el usuario con el ID proporcionado.
      // Puedes mostrar un mensaje de confirmación antes de eliminarlo.
    }

    editarPelicula(pelicula: any) {
      // Lógica para editar la película
    }
    
    eliminarPelicula(pelicula: any) {
      // Lógica para eliminar la película
    }

}
