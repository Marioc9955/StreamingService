import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() onSubmitLoginEvent = new EventEmitter();

  constructor(private authService: AuthService, private router: Router,
    private sharedService: SharedService) { }

  login: string = "";
  userPassword: string = "";

  isSuccessful = false;
  isSignInFailed = false;
  errorMessage = '';

  isLoginAdmin: boolean;

  ngOnInit() {
    this.sharedService.isAdmin$.subscribe(v => {
      this.isLoginAdmin = v;
    })
  }

  onSubmitLogin(): void {

    this.authService.login(this.login, this.userPassword).subscribe(
      (respuesta) => {
        console.log(respuesta);
        localStorage.setItem('token', respuesta.token);
        if (respuesta.rolUsuario.id == 2) {
          this.sharedService.changeAdminLogged(true);
        } else {
          this.sharedService.changeAdminLogged(false);
        } 
        if (respuesta.plan) {
          console.log("usuario ya tiene plan")
          this.sharedService.changeComponentActive('Perfiles');
          this.router.navigate(['/perfiles']);
        } else {
          console.log("usuario debe elegir plan")
          this.router.navigate(['/planes']);
        }
        this.isSuccessful=true;
      },
      (error) => {
        this.errorMessage = 'Credenciales incorrectas';
        this.isSignInFailed=true;
        console.log(error);
      }
    );
  }


}
