import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Producto } from '../models/produto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  url = 'http://localhost:4000/api/productos/';

  constructor(private http: HttpClient) {}

  postProducto(producto: any): Observable<any> {
    return this.http.post(this.url, producto);
  }

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  putProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(this.url + id, producto);
  }

  getProducto(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
