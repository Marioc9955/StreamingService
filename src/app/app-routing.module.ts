import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { ElegirPlanComponent } from './elegir-plan/elegir-plan.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { ContenidoStreamingComponent } from './contenido-streaming/contenido-streaming.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'planes', component: ElegirPlanComponent},
{ path: 'perfiles', component: PerfilesComponent},
{ path: 'home', component: HomeComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegistrarUsuarioComponent },
{ path: 'contenido', component: ContenidoStreamingComponent },
{ path: 'board-admin', component: BoardAdminComponent },
{ path: 'productos', component: ProductosComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
