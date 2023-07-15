import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/produto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css'],
})
export class ListarProductosComponent implements OnInit {
  listaProductos: Producto[] = [];
  espera = true;

  constructor(
    private _productoService: ProductoService,
    private route: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.espera = false;
      this.obtenerProductos();
    }, 1000);
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(
      (data) => {
        this.listaProductos = data;
        console.log(this.listaProductos);
        if (this.listaProductos.length == 0) {
          this._toastr.warning('No hay productos registrados', 'SIN PRODUCTOS');
        }
      },
      (e) => {
        console.log(e);
      }
    );
  }

  eliminarProducto(id: any) {
    this._productoService.deleteProducto(id).subscribe(
      (data) => {
        this._toastr.error(
          'El Producto fue eliminado con exito!',
          'Producto Eliminado'
        );
        this.obtenerProductos();
      },
      (e) => {
        console.log(e);
        // this._toastr.error('Hello world!', 'Toastr fun!');
      }
    );
  }
}
