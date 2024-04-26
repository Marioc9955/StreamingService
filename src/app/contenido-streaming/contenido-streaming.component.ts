import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-contenido-streaming',
  templateUrl: './contenido-streaming.component.html',
  styleUrls: ['./contenido-streaming.component.css']
})
export class ContenidoStreamingComponent {

  constructor(private sharedService: SharedService, private router: Router,
    private http: HttpClient) { }

  contenidoAMostrar: string

  peliculasF: any[] = [];
  peliculasH: any[] = [];
  series: any[] = [];

  ngOnInit() {
    this.sharedService.contenidoAMostrar$.subscribe(c => {
      
      switch (c) {
        case 'Peliculas-18':
          this.obtenerPeliculasFamily();
          break;
        case 'Peliculas+18':
          this.obtenerPeliculas18();
          break;
        case 'Series':
          this.obtenerSeries();
          break;
      }
      this.contenidoAMostrar = c
    })
  }

  printPF() {
    // Para imprimir los objetos del array en la consola
    for (let i = 0; i < this.peliculasF.length; i++) {
      console.log(this.peliculasF[i]);
    }
  }

  printPH() {
    // Para imprimir los objetos del array en la consola
    for (let i = 0; i < this.peliculasH.length; i++) {
      console.log(this.peliculasH[i]);
    }
  }

  obtenerPeliculasFamily() {
    this.http.get(environment.url + '/api/pelicula/peliculasF').subscribe(
      (response: any) => {
        // Maneja la respuesta del servidor, que debería ser la lista de películas
        console.log(response);
        this.peliculasF = response;
      },
      (error) => {
        // Maneja el error en caso de que la obtención de películas falle
        console.error("Error al obtener las películas", error);
      }
    );
  }

  // Obtener películas para mayores de 18
  obtenerPeliculas18() {
    console.log("Obteniendo pelis de terror");
    this.http.get(environment.url + '/api/pelicula/peliculasH').subscribe(
      (response: any) => {
        console.log("se obtenieron?")
        console.log(response);
        // Maneja la respuesta del servidor, que debería ser la lista de películas
        this.peliculasH = response;
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

}
