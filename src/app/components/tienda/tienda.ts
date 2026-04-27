import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito';
import { CHULETONES_DISPONIBLES } from '../../data/chuletones';
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
export class TiendaComponent {
  chuletones = signal(CHULETONES_DISPONIBLES);
  selectedChuleton = signal<IChuleton | null>(null);
  showModal = signal(false);

  constructor(private carritoService: CarritoService) {}

 
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
}