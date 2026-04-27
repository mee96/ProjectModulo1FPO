import { Injectable } from '@angular/core';
import { IChuleton } from '../models/ichuleton';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly STORAGE_KEY = 'chuletones_data';

  guardarChuletones(chuletones: IChuleton[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(chuletones));
  }

  cargarChuletones(): IChuleton[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  anadirChuleton(chuletones: IChuleton[], nuevoChuleton: IChuleton): IChuleton[] {
    const actualizados = [...chuletones, nuevoChuleton];
    this.guardarChuletones(actualizados);
    return actualizados;
  }

  actualizarChuleton(chuletones: IChuleton[], chuletonActualizado: IChuleton): IChuleton[] {
    const index = chuletones.findIndex(c => c.id === chuletonActualizado.id);
    if (index !== -1) {
      const actualizados = [...chuletones];
      actualizados[index] = chuletonActualizado;
      this.guardarChuletones(actualizados);
      return actualizados;
    }
    return chuletones;
  }

  eliminarChuleton(chuletones: IChuleton[], id: string): IChuleton[] {
    const actualizados = chuletones.filter(c => c.id !== id);
    this.guardarChuletones(actualizados);
    return actualizados;
  }
}