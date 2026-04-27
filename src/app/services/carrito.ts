import { Injectable, signal, computed } from '@angular/core';
import { IChuleton } from '../models/ichuleton';

//El carrito es una signal privada que almacena un array de chuletones. Expongo dos valores computed: totalItems (número total de productos) y totalPrecio (suma de todos los productos con IVA incluido). Cuando añado un producto, compruebo si ya existe para incrementar la cantidad, si no existe lo creo nuevo. Los computed se recalcular automáticamente cuando cambia el carrito

//En el CarritoService, la variable carrito es una signal privada. Cuando añado un producto con anadirAlCarrito(), hago this.carrito.set(...) y automáticamente los computed como totalItems se recalculan y el navbar actualiza el contador

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private carrito = signal<IChuleton[]>([]);
  
  // Usamos computed para que se actualice automáticamente/ se recalcula cuando cambia el carrito
  totalItems = computed(() => {
    return this.carrito().reduce((sum, item) => sum + item.cantidad, 0);
  });
  
  totalPrecio = computed(() => {
    return this.carrito().reduce((total, item) => total + (item.precio * item.peso * item.cantidad), 0);
  });

  // // Si existe, aumenta cantidad; si no, añade nuevo
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