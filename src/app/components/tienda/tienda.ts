import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito';
import { StorageService } from '../../services/storage';
import { CHULETONES_DEFAULT } from '../../data/chuletones';
import { IChuleton } from '../../models/ichuleton';
import { ModalDetalleComponent } from '../modal-detalle/modal-detalle';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, ModalDetalleComponent, NavbarComponent],
  templateUrl: './tienda.html',
  styleUrls: ['./tienda.scss']
})
export class TiendaComponent implements OnInit {
  chuletones = signal<IChuleton[]>([]);
  selectedChuleton = signal<IChuleton | null>(null);
  showModal = signal(false);

  constructor(
    private carritoService: CarritoService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.cargarChuletones();
  }

  cargarChuletones() {
  try {
    // Intentar cargar del localStorage
    const guardados = this.storageService.cargarChuletones();
    
    if (guardados && guardados.length > 0) {
      // Validar que cada chuletón tenga todas las propiedades necesarias
      const validados = guardados.filter(c => 
        c.tipo && c.origen && c.peso && c.maduracion !== undefined && 
        c.precio && c.imagen
      );
      this.chuletones.set(validados);
      console.log('Chuletones cargados:', validados);
    } else {
      // Si no hay datos, usar los datos por defecto y guardarlos
      this.chuletones.set(CHULETONES_DEFAULT);
      this.storageService.guardarChuletones(CHULETONES_DEFAULT);
    }
  } catch (error) {
    console.error('Error cargando chuletones:', error);
    // Fallback a datos por defecto
    this.chuletones.set(CHULETONES_DEFAULT);
  }
}

  anadirAlCarrito(chuleton: IChuleton) {
    this.carritoService.anadirAlCarrito(chuleton);
  }

  abrirDetalle(chuleton: IChuleton) {
    this.selectedChuleton.set(chuleton);
    this.showModal.set(true);
  }

  cerrarModal() {
    this.showModal.set(false);
    this.selectedChuleton.set(null);
  }
  trackByTipo(index: number, chuleton: IChuleton): string {
  return chuleton.id || chuleton.tipo;
}
}