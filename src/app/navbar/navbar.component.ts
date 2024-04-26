import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private sharedService: SharedService, private router: Router) { }

  componentActive: string;
  isPlanAv: boolean;
  
  private subscriptions: Subscription[] = [];

  adminLogged:boolean;

  ngOnInit() {
    this.subscriptions.push(
      this.sharedService.componentActive$.subscribe(value => {
        this.componentActive = value;
      }),
      this.sharedService.isPlanAv$.subscribe(value => {
        this.isPlanAv = value;
      }),
      this.sharedService.adminLogged$.subscribe(value => {
        this.adminLogged = value;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  mostrarContenido(contenido:string){
    this.sharedService.changeContenidoAMostrar(contenido);
    this.router.navigate(['/contenido']);
    
  }

  aBoardAdmin(contenidoAdmin:string){
    this.sharedService.changeAdminContent(contenidoAdmin);
    this.router.navigate(['/board-admin']);
  }
}
