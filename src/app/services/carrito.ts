import { Injectable, signal, computed } from '@angular/core';
import { IChuleton } from '../models/ichuleton';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private carrito = signal<IChuleton[]>([]);
  
  // Usamos computed para que se actualice automáticamente
  totalItems = computed(() => {
    return this.carrito().reduce((sum, item) => sum + item.cantidad, 0);
  });
  
  totalPrecio = computed(() => {
    return this.carrito().reduce((total, item) => total + (item.precio * item.peso * item.cantidad), 0);
  });

  // IMPORTANTE: Cambiar 'añadir' por 'anadir' (sin ñ)
  anadirAlCarrito(chuleton: IChuleton) {
    const existingItem = this.carrito().find(item => item.tipo === chuleton.tipo);
    
    if (existingItem) {
      existingItem.cantidad++;
      this.carrito.set([...this.carrito()]);
    } else {
      const newItem = { ...chuleton, cantidad: 1, id: crypto.randomUUID() };
      this.carrito.set([...this.carrito(), newItem]);
    }
  }

  eliminarDelCarrito(index: number) {
    const newCarrito = [...this.carrito()];
    newCarrito.splice(index, 1);
    this.carrito.set(newCarrito);
  }

  vaciarCarrito() {
    this.carrito.set([]);
  }

  getCarrito() {
    return this.carrito;
  }
}