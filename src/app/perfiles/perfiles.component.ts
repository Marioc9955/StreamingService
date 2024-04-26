import { Component } from '@angular/core';
import { PerfilService } from '../service/perfil.service';
import { UsuarioService } from '../service/usuario.service';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent {

  constructor(private servicePerfil: PerfilService, private serviceUser: UsuarioService,
    private sharedService: SharedService, private router: Router) { }

  mapaPerfiles: Map<number, string> = new Map();
  maxPerfiles = 0;

  ngOnInit() {
    this.serviceUser.currentUser.subscribe(user => {
      console.log(user);
      console.log(user.perfiles.length);

      if (user.perfiles && user.perfiles.length > 0) {
        user.perfiles.forEach((perfil: any) => {
          this.mapaPerfiles.set(perfil.id, perfil.nombre);
        });
      }
      this.serviceUser.getPlanID(user.id).then(planID => {
        switch (planID) {
          case 1:
            this.maxPerfiles = 2;
            this.sharedService.changeIsPlanAv(false);
            break;
          case 2:
            this.maxPerfiles = 3;
            this.sharedService.changeIsPlanAv(false);
            break;
          case 3:
            this.maxPerfiles = 5;
            this.sharedService.changeIsPlanAv(true);
            break;
        }
        switch (user.edad > 18) {
          case true:
            this.sharedService.changeComponentActive('Peliculas+18');
            break;
          case false:
            this.sharedService.changeComponentActive('Peliculas-18');
            break;
        }
      });
    });

  }

  agregarPerfil(nombre: String) {
    this.serviceUser.currentUser.pipe(take(1)).subscribe(user => {
      console.log("usuario obtenido en agregarPerfil metodo de componente perfiles ", user)
      this.servicePerfil.crearPerfil({ nombre: nombre, usuario: user }).then((nuevoPerfil) => {
        // Actualiza el usuario con el nuevo perfil
        user.perfiles.push(nuevoPerfil); // Supongo que user tiene una propiedad "perfiles" que es un arreglo

        // Emite el nuevo usuario
        this.serviceUser.changeUser(user);

        console.log(nuevoPerfil);
        // Inicializa el mapa con los arreglos actualizados
        this.mapaPerfiles.set(nuevoPerfil.id, nuevoPerfil.nombre);
      })
        .catch((error) => {
          console.error("Error al crear el perfil", error);
        });
    });
  }

  abrirCuadroDeTexto() {
    // Utiliza window.prompt() para mostrar un cuadro de texto al usuario
    const nuevoPerfil = window.prompt('Ingrese el nombre del nuevo perfil');

    // Verifica si el usuario ingresó un nombre de perfil y si no se excede el máximo
    if (nuevoPerfil && this.mapaPerfiles.size < this.maxPerfiles) {
      // Agrega el nuevo perfil a la lista
      //this.perfiles.push(nuevoPerfil);
      this.agregarPerfil(nuevoPerfil)
    } else {
      // Maneja el caso en el que el usuario cancela el cuadro de diálogo o se alcanza el máximo de perfiles
      alert('No se pudo agregar un nuevo perfil.');
    }
  }

  eliminarPerfil(perfil: number) {
    // Elimina el perfil del mapa
    this.mapaPerfiles.delete(perfil);
  
    // Obten el usuario actual
    this.serviceUser.currentUser.pipe(take(1)).subscribe(user => {
  
      // Encuentra y elimina el perfil del arreglo de perfiles del usuario
      user.perfiles = user.perfiles.filter(p => p.id !== perfil);
  
      // Emite el nuevo usuario actualizado
      this.serviceUser.changeUser(user);
    });
  
    // Luego, elimina el perfil en el servicio de perfiles
    this.servicePerfil.eliminarPerfil(perfil);
  }

  aContenido() {
    this.router.navigate(['/contenido']);
  }

  aPlanes() {
    this.router.navigate(['/planes']);
  }

  pagarMes(){
    this.serviceUser.pagarMes();
  }
}
