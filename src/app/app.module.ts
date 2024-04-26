import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ElegirPlanComponent } from './elegir-plan/elegir-plan.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { AuthContentComponent } from './auth-content/auth-content.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContenidoStreamingComponent } from './contenido-streaming/contenido-streaming.component';
import { ProductosComponent } from './productos/productos.component';
import { ModelViewerComponent } from './model-viewer/model-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarUsuarioComponent,
    ElegirPlanComponent,
    LoginComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    AuthContentComponent,
    PerfilesComponent,
    NavbarComponent,
    ContenidoStreamingComponent,
    ProductosComponent,
    ModelViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
