import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito';
import { IChuleton } from '../../models/ichuleton';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.scss']
})
export class CarritoComponent {
  carrito = signal<IChuleton[]>([]);
  
  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) {
    this.carrito = this.carritoService.getCarrito();
  }

  getTotalItems(): number {
    return this.carrito().reduce((total, item) => total + item.cantidad, 0);
  }

  getSubtotal(): number {
    return this.carrito().reduce((total, item) => total + (item.precio * item.peso * item.cantidad), 0);
  }

  getIva(): number {
    return this.getSubtotal() * 0.21;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getIva();
  }

  actualizarCantidad(item: IChuleton, nuevaCantidad: number) {
    if (nuevaCantidad < 1) {
      this.eliminarItem(item);
    } else {
      item.cantidad = nuevaCantidad;
      // Forzar actualización de la señal
      this.carrito.set([...this.carrito()]);
    }
  }

  eliminarItem(item: IChuleton) {
    const index = this.carrito().findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.carritoService.eliminarDelCarrito(index);
    }
  }

  vaciarCarrito() {
    if (confirm('¿Seguro que quieres vaciar el carrito?')) {
      this.carritoService.vaciarCarrito();
    }
  }

  seguirComprando(): void {
    this.router.navigate(['/tienda']);
  }

  finalizarCompra(): void {
    const total = this.getTotal().toFixed(2);
    alert(`¡Gracias por tu compra! 🥩\nTotal: ${total}€`);
    this.carritoService.vaciarCarrito();
  }
}