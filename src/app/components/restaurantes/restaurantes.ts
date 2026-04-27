import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar';
import { RESTAURANTES_DISPONIBLES } from '../../data/restaurantesbcn';
import { IRestaurante } from '../../models/restaurante';

@Component({
  selector: 'app-restaurantes',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './restaurantes.html',
  styleUrls: ['./restaurantes.scss']
})
export class RestaurantesComponent {
  restaurantes = signal<IRestaurante[]>(RESTAURANTES_DISPONIBLES);
  selectedRestaurante = signal<IRestaurante | null>(null);
  showModal = signal(false);

  abrirDetalle(restaurante: IRestaurante) {
    this.selectedRestaurante.set(restaurante);
    this.showModal.set(true);
  }

  cerrarModal() {
    this.showModal.set(false);
    this.selectedRestaurante.set(null);
  }

  estaAbierto(horario: string): boolean {
    return horario?.includes('20:00') || false;
  }

  abrirMapa(direccion: string) {
    const encodedAddress = encodeURIComponent(direccion);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  }
}