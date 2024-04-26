import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private sharedService: SharedService, private router: Router) {}

  // Al pulsar el botón de registro, navega a la ruta del componente registrar-usuario
  register() {
    this.router.navigateByUrl('/register');
  }

  // Al pulsar el botón de logeo, navega a la ruta del componente login
  login() {
    this.sharedService.changeIsAdmin(false);
    this.router.navigate(['/login']);
  }

  loginAdmin(){
    this.sharedService.changeIsAdmin(true);
    this.router.navigate(['/login']);
  }
}
