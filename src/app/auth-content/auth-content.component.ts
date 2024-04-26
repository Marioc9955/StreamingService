import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})
export class AuthContentComponent {
  data: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(environment.url+'/messages').subscribe(
      (response: string[]) => {
        this.data = response;
      },
      (error) => {
        console.error('Error al realizar la solicitud GET en messages', error);
      }
    );
  }
}
