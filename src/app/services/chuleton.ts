// creamos ete services para que notifique a tienda cuando los datos cambien ya que se guarda en local storage y si seborra de proveedores tienda peta

import { Injectable, signal } from '@angular/core';
import { IChuleton } from '../models/ichuleton';
import { StorageService } from './storage';

@Injectable({ providedIn: 'root' })
export class ChuletonService {
  private chuletones = signal<IChuleton[]>([]);
  
  constructor(private storageService: StorageService) {
    this.cargarChuletones();
  }

  getChuletones() {
    return this.chuletones;
  }

  cargarChuletones() {
    const guardados = this.storageService.cargarChuletones();
    this.chuletones.set(guardados);
  }

  anadirChuleton(nuevoChuleton: IChuleton) {
    const actuales = this.chuletones();
    const actualizados = this.storageService.anadirChuleton(actuales, nuevoChuleton);
    this.chuletones.set(actualizados);
  }

  actualizarChuleton(chuletonActualizado: IChuleton) {
    const actuales = this.chuletones();
    const actualizados = this.storageService.actualizarChuleton(actuales, chuletonActualizado);
    this.chuletones.set(actualizados);
  }

  eliminarChuleton(id: string) {
    const actuales = this.chuletones();
    const actualizados = this.storageService.eliminarChuleton(actuales, id);
    this.chuletones.set(actualizados);
  }
}