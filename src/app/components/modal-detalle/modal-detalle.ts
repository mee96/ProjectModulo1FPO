import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IChuleton } from '../../models/ichuleton';

@Component({
  selector: 'app-modal-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-detalle.html',
  styleUrls: ['./modal-detalle.scss']
})
export class ModalDetalleComponent {
  @Input() chuleton: IChuleton | null = null;
  @Output() close = new EventEmitter<void>();

  cerrar() {
    this.close.emit();
  }

  cerrarFondo(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.cerrar();
    }
  }
}