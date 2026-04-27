import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';  
import { CarritoService } from '../../services/carrito';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  totalItems = computed(() => this.carritoService.totalItems());
  isLoggedIn = computed(() => this.authService.isLoggedIn());
  
  // Controla si el menú está abierto en móvil
  menuAbierto = false;

  constructor(
    private authService: AuthService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  // Abre/cierra el menú burger
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  // Cierra el menú (al hacer clic en un enlace)
  cerrarMenu() {
    this.menuAbierto = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.cerrarMenu(); // NUEVO: también cierra el menú
  }
}