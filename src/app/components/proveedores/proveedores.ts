import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar';
import { StorageService } from '../../services/storage';
import { IChuleton } from '../../models/ichuleton';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './proveedores.html',
  styleUrls: ['./proveedores.scss']
})
export class ProveedoresComponent implements OnInit {
  chuletones = signal<IChuleton[]>([]);
  showForm = signal(false);
  editMode = signal(false);
  currentChuleton: IChuleton | null = null;
  
  chuletonForm: FormGroup;
  mensajeExito = signal('');
  mensajeError = signal('');

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService
  ) {
    this.chuletonForm = this.fb.group({
      tipo: ['', [Validators.required, Validators.minLength(3)]],
      origen: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(0.1), Validators.max(5)]],
      maduracion: ['', [Validators.required, Validators.min(0), Validators.max(60)]],
      precio: ['', [Validators.required, Validators.min(10), Validators.max(500)]],
      imagen: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.cargarChuletones();
  }

  cargarChuletones() {
    const guardados = this.storageService.cargarChuletones();
    if (guardados && guardados.length > 0) {
      this.chuletones.set(guardados);
      console.log('📋 Chuletones cargados en proveedores:', guardados.length);
    }
  }

  abrirFormulario() {
    this.editMode.set(false);
    this.currentChuleton = null;
    this.chuletonForm.reset();
    this.showForm.set(true);
  }

  editarChuleton(chuleton: IChuleton) {
    this.editMode.set(true);
    this.currentChuleton = chuleton;
    this.chuletonForm.patchValue({
      tipo: chuleton.tipo,
      origen: chuleton.origen,
      peso: chuleton.peso,
      maduracion: chuleton.maduracion,
      precio: chuleton.precio,
      imagen: chuleton.imagen
    });
    this.showForm.set(true);
  }

  guardarChuleton() {
    console.log('🔵 Guardando chuletón...');
    
    if (this.chuletonForm.invalid) {
      console.log('❌ Formulario inválido');
      this.mensajeError.set('Por favor, rellena todos los campos correctamente');
      setTimeout(() => this.mensajeError.set(''), 3000);
      return;
    }

    // Crear el nuevo chuletón con todas las propiedades
    const nuevoChuleton: IChuleton = {
      id: Date.now().toString(),
      tipo: this.chuletonForm.value.tipo,
      origen: this.chuletonForm.value.origen,
      peso: Number(this.chuletonForm.value.peso),
      maduracion: Number(this.chuletonForm.value.maduracion),
      cantidad: 0,
      precio: Number(this.chuletonForm.value.precio),
      imagen: this.chuletonForm.value.imagen
    };

    console.log('📦 Nuevo chuletón a guardar:', nuevoChuleton);

    // Si es modo edición, actualizar el existente
    if (this.editMode() && this.currentChuleton) {
      nuevoChuleton.id = this.currentChuleton.id;
      const actualizados = this.storageService.actualizarChuleton(
        this.chuletones(), 
        nuevoChuleton
      );
      this.chuletones.set(actualizados);
      this.mensajeExito.set('✅ Chuletón actualizado correctamente');
    } else {
      // Modo creación - Añadir nuevo
      const actuales = this.chuletones();
      const actualizados = this.storageService.anadirChuleton(actuales, nuevoChuleton);
      this.chuletones.set(actualizados);
      this.mensajeExito.set('✅ Nuevo chuletón añadido correctamente');
    }

    console.log('📋 Total chuletones después de guardar:', this.chuletones().length);
    
    setTimeout(() => this.mensajeExito.set(''), 3000);
    this.cancelar();
  }

  eliminarChuleton(id: string) {
    if (confirm('¿Seguro que quieres eliminar este chuletón?')) {
      const actualizados = this.storageService.eliminarChuleton(this.chuletones(), id);
      this.chuletones.set(actualizados);
      this.mensajeExito.set('🗑️ Chuletón eliminado correctamente');
      setTimeout(() => this.mensajeExito.set(''), 3000);
    }
  }

  cancelar() {
    this.showForm.set(false);
    this.editMode.set(false);
    this.currentChuleton = null;
    this.chuletonForm.reset();
  }

  // Función de prueba para debugging
  guardarPrueba() {
    console.log('🧪 Función de prueba ejecutada');
    
    const testChuleton: IChuleton = {
      id: 'test_' + Date.now(),
      tipo: 'CHULETÓN DE PRUEBA',
      origen: 'Testing',
      peso: 1,
      maduracion: 10,
      cantidad: 0,
      precio: 100,
      imagen: 'assets/chuleton-1.jpg'
    };
    
    // Obtener datos actuales o crear array vacío
    const datosActualesStr = localStorage.getItem('chuletones_data');
    let datosActuales: IChuleton[] = [];
    
    if (datosActualesStr) {
      datosActuales = JSON.parse(datosActualesStr);
    }
    
    datosActuales.push(testChuleton);
    localStorage.setItem('chuletones_data', JSON.stringify(datosActuales));
    
    // Actualizar la signal
    this.chuletones.set(datosActuales);
    
    console.log('✅ Guardado de prueba completado');
    this.mensajeExito.set('🧪 Chuletón de prueba guardado');
    setTimeout(() => this.mensajeExito.set(''), 3000);
  }
}