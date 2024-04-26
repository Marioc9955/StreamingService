import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  productos:any[]=[]

  constructor(private productoService:ProductoService, private router:Router){}


  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.productoService.obtenerListaProductos().subscribe(p=>{
      this.productos=p;
    })
  }

  editarProducto(id: number) {
    this.router.navigate(['crear-producto', id]);
  }

  crearProducto(){
    this.router.navigate(['crear-producto', -1]);
  }

  eliminarProducto(id: number) {
    this.productoService.obtenerProductoPorId(id).subscribe(u => {
      console.log(u);

      u.cantidad = 0;
      u.estado = "No disponible";
      console.log(u);

      this.productoService.actualizarProducto(id, u).subscribe(ue => {
        console.log(ue);
        this.obtenerProductos();
      });

    });
  }

  verModelo3D(id: number){
    
  }
}
