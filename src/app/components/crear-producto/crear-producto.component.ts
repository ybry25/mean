import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/produto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent {
  productoForm: FormGroup;
  id: string | null;
  mensage = 'CREAR';

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _toastr: ToastrService,
    private _productoService: ProductoService
  ) {
    this.productoForm = fb.group({
      producto: ['po', Validators.required],
      categoria: ['po', Validators.required],
      ubicacion: ['', Validators.required],
      precio: [0, Validators.required],
    });
    this.id = _activatedRoute.snapshot.paramMap.get('id');

    if (this.id != null) {
      this.mensage = 'EDITAR';
      _productoService.getProducto(this.id).subscribe(
        (data) => {
          this.productoForm.setValue({
            producto: data.nombre,
            categoria: data.categoria,
            ubicacion: data.ubicacion,
            precio: data.precio,
          });
        },
        (e) => {
          console.log(e);
        }
      );
    }
  }

  guardarProducto() {
    console.log(this.productoForm.value);

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    };

    if (this.id == null) {
      this._productoService.postProducto(PRODUCTO).subscribe(
        (data) => {
          this._toastr.success(
            'se guardo el producto exitosamente',
            'Producto guardado'
          );
        },
        (e) => {
          console.log(e);
        }
      );
    } else {
      this._productoService.putProducto(this.id, PRODUCTO).subscribe(
        (data) => {
          this._toastr.info(
            'se actualizo el producto exitosamente',
            'Producto actualizado'
          );
        },
        (e) => {
          console.log(e);
        }
      );
      this.id = null;
    }

    this._router.navigate(['/']);

    this.productoForm.reset();
  }
}
