import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent {

  @Output() onSubmitRegisterEvent = new EventEmitter();

  form: any = {
    username: null,
    email: null,
    birthday: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmitRegister(): void {
    this.authService.register(this.form.username, this.form.email, this.form.birthday, this.form.password).subscribe(
      (respuesta) => {
        console.log(respuesta.token);
        console.log(respuesta);
        //localStorage.setItem('token', respuesta.token);
        this.router.navigate(['/planes']);
      },
      (error) => {
        this.errorMessage = 'Credenciales incorrectas';
        console.log(error);
      }
    );

    // this.authService.onRegister({
    //   "username": this.form.username, "email": this.form.email,
    //   "birthday": this.form.birthday, "password": this.form.password
    // }).then(
    //   data => {
    //     if (data) {
    //       console.log("registro exitoso")
    //       //this.servicio.changeUser(data); // Actualiza los datos del usuario
    //       this.router.navigate(['/planes']);
    //     } else {
    //       alert("Error al registrar usuario sesion");
    //     }
    //   }
    // );
  }


  // onSubmit(): void {
  //   const { username, email, birthday, password } = this.form;

  //   console.log(username);
  //   console.log(email);
  //   console.log(typeof birthday);
  //   console.log(birthday);

  //   this.authService.register(username, email, birthday, password).subscribe({
  //     next: data => {
  //       console.log("user registered id " + data.id);
  //       console.log("user registered id " + data.password);
  //       this.servicio.changeUser(data); // Actualiza los datos del usuario
  //       this.isSuccessful = true;
  //       this.isSignUpFailed = false;
  //       this.router.navigate(['/planes']);
  //     },
  //     error: err => {
  //       this.errorMessage = err.error.message;
  //       this.isSignUpFailed = true;
  //     }
  //   });

  // }
}
