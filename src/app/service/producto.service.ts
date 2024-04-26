import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  getLastProducts(count: number): Observable<any[]> {
    const url = `${environment.url}/api/product/lastProducts/${count}`;
    return this.http.get<any[]>(url);
  }

  obtenerListaProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url}/api/product/productos`);
  }

  actualizarProducto(id: number, product: any): Observable<Object> {
    return this.http.put(`${environment.url}/api/product/edit/${id}`, product);
  }

  crearProducto(product: any): Observable<Object> {
    return this.http.post(`${environment.url}/api/product/crear`, product);
  }

  obtenerProductoPorId(id: number): Observable<any> {
    const url = `${environment.url}/api/product/${id}`;
    return this.http.get<any>(url);
  }
}
